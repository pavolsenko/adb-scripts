"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adbkit_1 = __importDefault(require("@devicefarmer/adbkit"));
const client = adbkit_1.default.createClient();
const wait = (ms) => {
    console.log('waiting ' + ms.toString() + 'ms');
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
};
const tap = (device, x, y) => {
    x = x + Math.floor(Math.random() * 10);
    y = y + Math.floor(Math.random() * 10);
    const command = 'input tap ' + x.toString() + ' ' + y.toString();
    device.shell(command);
    console.log(command);
};
const randomSwipe = (device, direction) => {
    let fromX;
    let fromY;
    let toX;
    let toY;
    if (direction === 'up') {
        fromX = 300;
        fromY = 500;
        toX = fromX + Math.ceil(Math.random() * 50);
        toY = fromY - Math.ceil(Math.random() * 300);
    }
    else if (direction === 'right') {
        fromX = 300;
        fromY = 300;
        toX = fromX + Math.ceil(Math.random() * 300);
        toY = fromY + Math.ceil(Math.random() * 50);
    }
    else if (direction === 'down') {
        fromX = 300;
        fromY = 300;
        toX = fromX + Math.ceil(Math.random() * 50);
        toY = fromY + Math.ceil(Math.random() * 400);
    }
    else if (direction === 'left') {
        fromX = 300;
        fromY = 300;
        toX = fromX - Math.ceil(Math.random() * 200);
        toY = fromY + Math.ceil(Math.random() * 50);
    }
    const command = 'input swipe ' + fromX.toString() + ' ' + fromY.toString() + ' ' + toX.toString() + ' ' + toY.toString();
    device.shell(command);
    console.log(command);
};
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
    .then(() => wait(5000))
    .then(() => tap(device, 586, 1150))
    .then(() => wait(5000))
    .then(() => tap(device, 550, 550))
    .then(() => wait(4000))
    .then(() => {
    const interval = setInterval(() => {
        const direction = Math.random();
        if (direction < 0.5) {
            randomSwipe(device, 'right');
        }
        else {
            randomSwipe(device, 'left');
        }
    }, 1000);
    setTimeout(() => clearInterval(interval), 30000);
})
    .then(() => wait(30000))
    .then(() => tap(device, 530, 650))
    .catch(function (err) {
    console.error('Something went wrong:', err.stack);
});
//# sourceMappingURL=start.js.map