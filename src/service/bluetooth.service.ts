export class BluetoothService {
  btDevices: BluetoothDevice[] = [];

  constructor() {
    navigator.bluetooth
      .getDevices()
      .then(devices => {
        devices.forEach(device => {
          this.btDevices.push(device);
        });
      })
      .catch(error => console.log('Argh! ' + error));
  }
}

export const bluetoothService = new BluetoothService();
