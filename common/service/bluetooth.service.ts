import { BT } from '../model/bt.ts';
import { configService, mediaService, playService } from './index.service.ts';
import { SQUARES } from 'chess.js';

import { FEN } from '../model/fen';
import { decodeHex } from './chessnut.util.ts';

const CN1 = '1b7e8261-2877-41c3-b46e-cf057c562023';
const CN2 = '1b7e8271-2877-41c3-b46e-cf057c562023';
const CN3 = '1b7e8281-2877-41c3-b46e-cf057c562023';
const CN4 = '9e5d1e47-5c13-44a0-b635-82ad38a1386f';

// Documented characteristic UUIDs
const CH_WRITE = '1b7e8272-2877-41c3-b46e-cf057c562023';
const CH_CONFIRM = '1b7e8273-2877-41c3-b46e-cf057c562023';
const CH_BOARD_DATA = '1b7e8262-2877-41c3-b46e-cf057c562023';

// Nordic UART Service (NUS) UUIDs
const NUS_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join(' ');
}

function isPrefix(bytes: Uint8Array, prefix: number[]) {
  if (bytes.length < prefix.length) return false;
  for (let i = 0; i < prefix.length; i++) {
    if (bytes[i] !== prefix[i]) return false;
  }
  return true;
}

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  let t: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    t = setTimeout(() => reject(new Error(label + ' timed out after ' + ms + 'ms')), ms);
  });

  // Suppress unhandled rejection in p if it loses the race
  p.catch(() => {});

  return Promise.race([p, timeout]).finally(() => {
    if (t) clearTimeout(t);
  }) as Promise<T>;
}

export class BluetoothService {
  constructor() {}

  // keep subscribed characteristics to retain references while connected (prevents GC/lifecycle quirks)

  private subscribed: BluetoothRemoteGATTCharacteristic[] = [];

  private activeDevice: BluetoothDevice | null = null;
  private disconnectHandler?: () => void;
  private writeChar: BluetoothRemoteGATTCharacteristic | null = null;

  // Track last full board string (a8..h1) for move detection.
  private lastBrd: string | null = null;
  private lastMove: string | null = null;
  private botBrd: string | null = null;

  addBT = () => {
    addBtDevice();
  };

  disconnect = async () => {
    try {
      // stop notifications first so we don't keep stale subscriptions around
      for (const ch of this.subscribed) {
        try {
          await ch.stopNotifications();
        } catch {
          // ignore
        }
      }
      this.subscribed = [];

      if (this.activeDevice && this.disconnectHandler) {
        try {
          this.activeDevice.removeEventListener('gattserverdisconnected', this.disconnectHandler);
        } catch {
          // ignore
        }
      }
      if (this.activeDevice?.gatt?.connected) {
        this.activeDevice.gatt.disconnect();
      }
      this.activeDevice = null;
      this.disconnectHandler = undefined;
      this.lastBrd = null;

      console.log('Bluetooth: disconnected');
    } catch (e) {
      console.warn('Bluetooth: disconnect() failed', e);
    }
  };

  connect = async () => {
    // Ensure a clean slate per connect attempt (refreshes/hot reloads can otherwise stack listeners)
    await this.disconnect();

    try {
      console.log('Bluetooth: connect() build=2025-12-27-chessnut-proto+timeouts+retry');

      const device = await chooseBtDevice();
      this.activeDevice = device;

      if (!device.gatt) {
        console.error('Bluetooth: Device has no GATT server');
        return;
      }

      this.disconnectHandler = () => {
        console.warn('Bluetooth: GATT server disconnected');
      };
      device.addEventListener('gattserverdisconnected', this.disconnectHandler);

      // Connect + discover with retries (macOS BLE sometimes hangs on getPrimaryService after refresh)
      let server: BluetoothRemoteGATTServer | null = null;
      let services: BluetoothRemoteGATTService[] = [];

      for (let attempt = 1; attempt <= 3; attempt++) {
        console.log('Bluetooth: Connect/discover attempt ' + attempt + '/3');

        // (Re)connect
        if (device.gatt.connected) {
          console.log('Bluetooth: Already connected, forcing disconnect before retry');
          try {
            device.gatt.disconnect();
          } catch {
            // ignore
          }
          await new Promise<void>(r => setTimeout(r, 300));
        }

        server = await withTimeout(device.gatt.connect(), 8000, 'gatt.connect');
        console.log('Bluetooth: Connected to GATT server');

        // Some BLE stacks need a beat after connection before service discovery becomes reliable.
        await new Promise<void>(resolve => setTimeout(resolve, 300));

        // Prefer minimal probing: we only need CN1 + CN2 for Chessnut Air.
        const requiredServiceUuids = [CN1, CN2];
        const optionalServiceUuids = [CN3, CN4, NUS_SERVICE_UUID];

        services = [];

        // First try fetching required services explicitly.
        let requiredOk = true;
        for (const uuid of requiredServiceUuids) {
          console.log('Bluetooth: Fetching primary service: ' + uuid);
          try {
            const s = await withTimeout(
              server.getPrimaryService(uuid),
              7000,
              'getPrimaryService ' + uuid
            );
            console.log('Bluetooth: Got primary service: ' + s.uuid);
            services.push(s);
          } catch (e) {
            console.warn('Bluetooth: Required service fetch failed: ' + uuid, e);
            requiredOk = false;
            break;
          }
        }

        if (!requiredOk) {
          console.warn(
            'Bluetooth: Required service discovery failed; retrying connect/discover...'
          );
          try {
            device.gatt.disconnect();
          } catch {
            // ignore
          }
          await new Promise<void>(r => setTimeout(r, 700));
          continue;
        }

        // Optionally probe other known services, but don't let them block the session.
        for (const uuid of optionalServiceUuids) {
          console.log('Bluetooth: Fetching optional primary service: ' + uuid);
          try {
            const s = await withTimeout(
              server.getPrimaryService(uuid),
              2000,
              'getPrimaryService ' + uuid
            );
            console.log('Bluetooth: Got optional primary service: ' + s.uuid);
            services.push(s);
          } catch (e) {
            console.warn('Bluetooth: Optional service not available: ' + uuid, e);
          }
        }

        console.log('Bluetooth: Discovered services=' + services.map(s => s.uuid).join(', '));
        break;
      }

      if (!server) {
        console.error('Bluetooth: Failed to connect');
        return;
      }

      const s1 = services.find(s => s.uuid.toLowerCase() === CN1);
      const s2 = services.find(s => s.uuid.toLowerCase() === CN2);
      if (!s1 || !s2) {
        // Fallback: enumerate services once and filter (sometimes succeeds when direct getPrimaryService hangs)
        console.warn(
          'Bluetooth: Missing CN1/CN2 after explicit fetch; trying getPrimaryServices() fallback'
        );
        try {
          // @ts-ignore
          const all = await withTimeout(server.getPrimaryServices(), 7000, 'getPrimaryServices');
          const allServices = (all as any[]).filter(Boolean) as BluetoothRemoteGATTService[];
          const f1 = allServices.find(s => s.uuid.toLowerCase() === CN1);
          const f2 = allServices.find(s => s.uuid.toLowerCase() === CN2);
          if (f1) {
            services.push(f1);
          }
          if (f2) {
            services.push(f2);
          }
        } catch (e) {
          console.warn('Bluetooth: getPrimaryServices() fallback failed', e);
        }
      }

      const ss1 = services.find(s => s.uuid.toLowerCase() === CN1);
      const ss2 = services.find(s => s.uuid.toLowerCase() === CN2);
      if (!ss1 || !ss2) {
        console.error(
          'Bluetooth: Missing required services. Need CN1=' +
            CN1 +
            ' and CN2=' +
            CN2 +
            '. Got=' +
            services.map(s => s.uuid).join(', ')
        );
        return;
      }

      console.log('Bluetooth: Fetching characteristics...');
      const boardDataChar = await withTimeout(
        ss1.getCharacteristic(CH_BOARD_DATA),
        7000,
        'getCharacteristic boardData'
      );
      const confirmChar = await withTimeout(
        ss2.getCharacteristic(CH_CONFIRM),
        7000,
        'getCharacteristic confirm'
      );
      this.writeChar = await withTimeout(
        ss2.getCharacteristic(CH_WRITE),
        7000,
        'getCharacteristic write'
      );

      console.log('Bluetooth: boardDataChar=' + boardDataChar.uuid);
      console.log('Bluetooth: confirmChar=' + confirmChar.uuid);
      console.log('Bluetooth: writeChar=' + this.writeChar.uuid);

      this.subscribed = [];

      // Wait for confirmation 0x23 0x01 0x00 after init command
      const expectedConfirm = new Uint8Array([0x23, 0x01, 0x00]);
      let confirmResolve: (() => void) | null = null;
      const confirmPromise = new Promise<void>(resolve => {
        confirmResolve = resolve;
      });

      confirmChar.addEventListener('characteristicvaluechanged', (event: Event) => {
        const target = event.target as BluetoothRemoteGATTCharacteristic | null;
        const dv = target?.value;
        if (!dv) return;
        const bytes = new Uint8Array(dv.buffer);
        console.log('Bluetooth: confirm notify: ' + bytesToHex(bytes));

        if (
          bytes.length >= 3 &&
          bytes[0] === expectedConfirm[0] &&
          bytes[1] === expectedConfirm[1] &&
          bytes[2] === expectedConfirm[2]
        ) {
          confirmResolve?.();
          confirmResolve = null;
        }
      });

      boardDataChar.addEventListener('characteristicvaluechanged', (event: Event) => {
        const target = event.target as BluetoothRemoteGATTCharacteristic | null;
        const dv = target?.value;
        if (!dv) return;
        const bytes = new Uint8Array(dv.buffer);

        // Documented: 38 bytes, prefix 0x01 0x24 indicates position signal
        if (bytes.length === 38 && isPrefix(bytes, [0x01, 0x24])) {
          const hex = bytesToHex(bytes);
          //          console.log('Bluetooth: board data: ' + hex);
          const brd = decodeHex(hex);
          if (brd) {
            if (brd !== this.lastBrd) {
              console.log('Bluetooth: Board: ' + FEN.brd2fen(brd) + ' "' + brd + '"');
              if (brd == this.botBrd) {
                this.lastMove = brd;
                this.clearLeds();
                this.botBrd = null;
                mediaService.soundClick();
              } else if (this.lastMove) {
                const move = FEN.detectMove(this.lastMove, brd);
                if (move) {
                  this.lastMove = brd;
                  console.log('Bluetooth: Move: ' + SQUARES[move[0]] + ' ' + SQUARES[move[1]]);
                  // signal move to Chessnut
                  this.moveLeds(move);
                  playService.pieceMoveAction(SQUARES[move[0]], SQUARES[move[1]]);
                }
              } else {
                this.lastMove = brd;
              }
              this.lastBrd = brd;
            }
          } else {
            console.log('Bluetooth: could not decode frame ');
          }
        } else {
          console.log('Bluetooth: data(' + bytes.length + ') ' + bytesToHex(bytes));
        }
      });

      console.log('Bluetooth: starting notifications...');
      if (confirmChar.properties.notify) {
        try {
          await withTimeout(
            confirmChar.startNotifications(),
            5000,
            'confirmChar.startNotifications'
          );
          this.subscribed.push(confirmChar);
        } catch (e) {
          console.warn('Bluetooth: Failed to start notifications on confirmChar', e);
        }
      } else {
        console.warn('Bluetooth: confirmChar does not support notifications');
      }

      if (boardDataChar.properties.notify) {
        try {
          await withTimeout(
            boardDataChar.startNotifications(),
            5000,
            'boardDataChar.startNotifications'
          );
          this.subscribed.push(boardDataChar);
        } catch (e) {
          console.warn('Bluetooth: Failed to start notifications on boardDataChar', e);
        }
      } else {
        console.warn('Bluetooth: boardDataChar does not support notifications');
      }

      console.log('Bluetooth: Notifications started for confirm + board data');

      // Send init command (0x21 0x01 0x00) to write characteristic
      const initCmd = new Uint8Array([0x21, 0x01, 0x00]);
      console.log('Bluetooth: sending init: ' + bytesToHex(initCmd));
      try {
        if (this.writeChar.properties.writeWithoutResponse) {
          await withTimeout(
            this.writeChar.writeValueWithoutResponse(initCmd),
            5000,
            'writeValueWithoutResponse init'
          );
        } else {
          await withTimeout(this.writeChar.writeValue(initCmd), 5000, 'writeValue init');
        }
      } catch (e) {
        console.error('Bluetooth: init write failed', e);
        return;
      }

      // Wait for confirmation (up to 3s)
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error('Timeout waiting for init confirmation (0x23 0x01 0x00)')),
          3000
        )
      );

      try {
        await Promise.race([confirmPromise, timeout]);
        console.log('Bluetooth: init confirmed');
      } catch (e) {
        console.warn('Bluetooth: init confirmation not received (board may still stream):', e);
        // no hard-fail: some firmwares might not confirm but still stream
      }

      console.log('Bluetooth: connected and listening (board should send data ~every 200ms)');
    } catch (error) {
      console.error('Bluetooth Error:', error);
    }
  };

  moveLeds = async (move: number[]) => {
    const grid = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
    writeBit(move[0], grid);
    writeBit(move[1], grid);
    await this.setLeds(grid, 'set Leds' + move[0].toString());
  };

  clearLeds = async () => {
    const grid = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
    await this.setLeds(grid, 'clear Leds');
  };

  copyBoard = () => {
    if (this.lastBrd) {
      const fen = playService.fen;
      const i = fen.indexOf(' ');
      playService.fen = FEN.brd2fen(this.lastBrd) + fen.substring(i);
      this.clearLeds();
      this.lastMove = null;
      this.lastBrd = null;
    }
  };

  private async setLeds(grid: number[], label: string) {
    const initCmd = new Uint8Array([0x0a, 0x08, ...grid]);
    const writer = this.writeChar;
    if (writer) {
      try {
        await withTimeout(writer.writeValue(initCmd), 5000, label);
      } catch (e) {
        console.warn('Write LEDs failed', e);
      }
    }
  }

  botMove = async (fen: string, from: number, to: number) => {
    this.botBrd = FEN.fen2brd(fen);
    await this.moveLeds([from, to]);
  };
}

function writeBit(p: number, grid: number[]) {
  // Set the bit corresponding to square p. Use |= to set, ^= to toggle.
  // XOR is used here to toggle the bit.
  grid[(p - (p % 8)) / 8] ^= 1 << (7 - (p % 8));
}

async function addBtDevice() {
  chooseBtDevice()
    .then(bt => {
      configService.bts.push(new BT(bt.name, bt.id));
    })
    .catch(e => {
      console.warn('Bluetooth: addBtDevice failed', e);
    });
}

async function chooseBtDevice() {
  // If the user has already granted access to the board, we can reconnect without showing the picker.
  try {
    // Some browsers require an exact namePrefix match; we still filter as a safety check.
    // @ts-ignore
    const devices: BluetoothDevice[] = await navigator.bluetooth.getDevices();
    const existing = devices.find(d => (d.name || '').startsWith('Chessnut'));
    if (existing) return existing;
  } catch {
    // getDevices not supported or not permitted yet; fall back to requestDevice
  }

  return await navigator.bluetooth.requestDevice({
    filters: [{ namePrefix: 'Chessnut' }],
    optionalServices: [CN1, CN2, CN3, CN4, NUS_SERVICE_UUID],
  });
}
