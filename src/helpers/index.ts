import {DeviceClient} from '@devicefarmer/adbkit';
import {TDirection} from '../types';

export const wait = (ms: number): Promise<any> => {
    console.log('waiting ' + ms.toString() + 'ms');
    return new Promise((resolve: any) => {
        setTimeout(() => resolve(), ms);
    });
};

export const tap = (device: DeviceClient, x: number, y: number): void => {
    x = x + Math.floor(Math.random() * 10);
    y = y + Math.floor(Math.random() * 10);

    const command = 'input tap ' + x.toString() + ' ' + y.toString();

    device.shell(command);
    console.log(command);
}

export const randomSwipe = (device: DeviceClient, direction: TDirection): void => {
    let fromX: number;
    let fromY: number;
    let toX: number;
    let toY: number;

    if (direction === 'up') {
        fromX = 300;
        fromY = 500;
        toX = fromX + Math.ceil(Math.random() * 50);
        toY = fromY - Math.ceil(Math.random() * 300);
    } else if (direction === 'right') {
        fromX = 300;
        fromY = 300;
        toX = fromX + Math.ceil(Math.random() * 300);
        toY = fromY + Math.ceil(Math.random() * 50);
    } else if (direction === 'down') {
        fromX = 300;
        fromY = 300;
        toX = fromX + Math.ceil(Math.random() * 50);
        toY = fromY + Math.ceil(Math.random() * 400);
    } else if (direction === 'left') {
        fromX = 300;
        fromY = 300;
        toX = fromX - Math.ceil(Math.random() * 200);
        toY = fromY + Math.ceil(Math.random() * 50);
    }

    const command = 'input swipe ' + fromX.toString() + ' ' + fromY.toString() + ' ' + toX.toString() + ' ' + toY.toString();

    device.shell(command);
    console.log(command);
}