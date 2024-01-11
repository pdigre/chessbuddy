import { BT } from "../model/bt.ts";
import {configService} from "./index.service.ts";

export class BluetoothService {
  constructor() {}
  addBT = ()=>{
    addBtDevice();
  };
  connect = ()=> {
    const bt = configService.bts[configService.cursorBT];
    getBtDevice(bt).then((btDevice)=> {

      btDevice.gatt?.connect()
        .then((server)=>{
        console.log("Connect "+bt + "=" + btDevice+" connected="+server.connected);
        // Getting Battery Service…
        return server.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e'); // , 'battery_service'
      })
        .then(service => {
          // Getting Battery Level Characteristic…
          return service.getCharacteristics(); // , 'battery_level'
        })
        .then(characteristics => {
          characteristics.forEach(c=> {
            c.getDescriptors('6e400001-b5a3-f393-e0a9-e50e24dcca9e')
              .then(descr=> {
                console.log(descr)
              });
            if (c.properties.read) { // 6e400002-b5a3-f393-e0a9-e50e24dcca9e
              c.readValue().then(value => console.log(`Prop is ${value}`));
            }
          });
        })
    });
  };
}

 async function addBtDevice() {
  const bt = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
  });
  if(bt?.name){
    configService.bts.push(new BT(bt.name,bt.id));
  }
}

async function getBtDevice(bt: BT) {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ name: bt.name}, { services: ['battery_service', '6e400001-b5a3-f393-e0a9-e50e24dcca9e'] }],
//    optionalServices: [],
  });
  return device;
}
