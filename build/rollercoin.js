"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adbkit_1 = __importDefault(require("@devicefarmer/adbkit"));
const helpers_1 = require("./helpers");
const client = adbkit_1.default.createClient();
let device;
client
    .listDevices()
    .then((devices) => {
    if (!devices || devices.length === 0) {
        throw new Error('Unable to find any android device.');
    }
    console.log('Connecting to a device at ' + devices[0].id);
    device = client.getDevice(devices[0].id);
    const command = 'am start -n com.android.chrome/com.google.android.apps.chrome.Main -d "https://rollercoin.com/game/choose_game"';
    device.shell(command);
    console.log(command);
})
    .then(() => helpers_1.wait(5000))
    .then(() => helpers_1.tap(device, 586, 1150))
    .then(() => helpers_1.wait(5000))
    .then(() => helpers_1.tap(device, 550, 550))
    .then(() => helpers_1.wait(4000))
    .then(() => {
    const interval = setInterval(() => {
        const direction = Math.random();
        if (direction < 0.5) {
            helpers_1.randomSwipe(device, 'right');
        }
        else {
            helpers_1.randomSwipe(device, 'left');
        }
    }, 1000);
    setTimeout(() => clearInterval(interval), 30000);
})
    .then(() => helpers_1.wait(30000))
    .then(() => helpers_1.tap(device, 530, 650))
    .catch(function (err) {
    console.error('Something went wrong:', err.stack);
});
//# sourceMappingURL=rollercoin.js.map