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

      btDevice.gatt?.connect().then((gatt)=>{
        console.log("Connect "+bt + "=" + btDevice+" connected="+gatt.connected);
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
    filters: [{ name: bt.name}],
//    optionalServices: [],
  });
  return device;
}
