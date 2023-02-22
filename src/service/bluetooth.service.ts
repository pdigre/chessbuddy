import { messageService } from './index.service';

export class BluetoothService {
  btDevices: BluetoothDevice[] = [];

  constructor() {
    try {
      const bt = navigator?.bluetooth;
      const devs = bt.getDevices();
      devs
        ?.then(devices => {
          devices.forEach(device => {
            this.btDevices.push(device);
          });
        })
        .catch(error => console.log('Argh! ' + error));
    } catch (error) {
      messageService.display('Bluetooth error:', String(error));
    }
  }
}

export const bluetoothService = new BluetoothService();
