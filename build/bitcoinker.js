"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adbkit_1 = __importDefault(require("@devicefarmer/adbkit"));
const helpers_1 = require("./helpers");
const client = adbkit_1.default.createClient();
let device;
const run = () => {
    client
        .listDevices()
        .then((devices) => {
        if (!devices || devices.length === 0) {
            throw new Error('Unable to find any android device.');
        }
        console.log('Connecting to a device at ' + devices[0].id);
        device = client.getDevice(devices[0].id);
        const command = 'am start -n com.android.chrome/com.google.android.apps.chrome.Main -d "https://bitcoinker.com/"';
        device.shell(command);
        console.log(command);
    })
        .then(() => helpers_1.wait(3000))
        .then(() => helpers_1.tap(device, 222, 1188))
        .then(() => helpers_1.wait(3000))
        .then(() => helpers_1.tap(device, 331, 1761))
        .then(() => {
        const command = 'am force-stop com.android.chrome';
        device.shell(command);
        console.log(command);
    });
};
setInterval(run, 1000 * 60 * 7);
//# sourceMappingURL=bitcoinker.js.map