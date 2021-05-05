import Adb, {Device, DeviceClient} from '@devicefarmer/adbkit';

import {randomSwipe, tap, wait} from "./helpers";

const client = Adb.createClient();
let device: DeviceClient;

client
    .listDevices()
    .then((devices: Device[]): void => {
        if (!devices || devices.length === 0) {
            throw new Error('Unable to find any android device.');
        }

        console.log('Connecting to a device at ' + devices[0].id);
        device = client.getDevice(devices[0].id);

        const command = 'am start -n com.android.chrome/com.google.android.apps.chrome.Main -d "https://rollercoin.com/game/choose_game"'
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
            } else {
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