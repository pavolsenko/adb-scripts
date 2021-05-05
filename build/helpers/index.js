"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomSwipe = exports.tap = exports.wait = void 0;
const wait = (ms) => {
    console.log((new Date).toISOString() + ' ' + 'waiting ' + ms.toString() + 'ms');
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
};
exports.wait = wait;
const tap = (device, x, y) => {
    x = x + Math.floor(Math.random() * 10);
    y = y + Math.floor(Math.random() * 10);
    const command = 'input tap ' + x.toString() + ' ' + y.toString();
    device.shell(command);
    console.log((new Date).toISOString() + ' ' + command);
};
exports.tap = tap;
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
    console.log((new Date).toISOString() + ' ' + command);
};
exports.randomSwipe = randomSwipe;
//# sourceMappingURL=index.js.map