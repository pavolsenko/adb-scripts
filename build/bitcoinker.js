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
    return new Promise((resolve) => {
        const command = 'am start -n com.android.chrome/com.google.android.apps.chrome.Main -d "https://bitcoinker.com/"';
        device.shell(command);
        console.log((new Date).toISOString() + ' ' + command);
        resolve();
    })
        .then(() => helpers_1.wait(Math.random() * 2000 + 4000))
        .then(() => helpers_1.tap(device, 222, 1188))
        .then(() => helpers_1.wait(Math.random() * 1000 + 3000))
        .then(() => helpers_1.tap(device, 331, 1761))
        .then(() => helpers_1.wait(Math.random() * 1000 + 1000))
        .then(() => helpers_1.tap(device, 275, 1840))
        .then(() => helpers_1.wait(Math.random() * 1000 + 1000))
        .then(() => helpers_1.tap(device, 946, 100))
        .then(() => helpers_1.wait(Math.random() * 1000 + 1000))
        .then(() => helpers_1.tap(device, 490, 210))
        .then(() => helpers_1.wait(Math.random() * 1000 + 1000))
        .then(() => {
        const command = 'input keyevent 4';
        device.shell(command);
        console.log((new Date).toISOString() + ' ' + command);
    });
};
client.listDevices()
    .then((devices) => {
    if (!devices || devices.length === 0) {
        throw new Error('Unable to find any android device.');
    }
    console.log((new Date).toISOString() + ' Connecting to a device at ' + devices[0].id);
    device = client.getDevice(devices[0].id);
})
    .then(() => run())
    .then(() => setInterval(run, 1000 * 60 * 7));
//# sourceMappingURL=bitcoinker.js.map