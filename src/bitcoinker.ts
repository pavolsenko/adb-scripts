import Adb, {Device, DeviceClient} from "@devicefarmer/adbkit";

import {tap, wait} from "./helpers";

const client = Adb.createClient();
let device: DeviceClient;

const run = () => {
    return new Promise<void>((resolve) => {
        const command = 'am start -n com.android.chrome/com.google.android.apps.chrome.Main -d "https://bitcoinker.com/"'
        device.shell(command);
        console.log((new Date).toISOString() + ' ' + command);
        resolve();
    })
        .then(() => wait(5000))
        .then(() => tap(device, 222, 1188))
        .then(() => wait(3000))
        .then(() => tap(device, 331, 1761))
        .then(() => wait(3000))
        .then(() => {
            const command = 'am force-stop com.android.chrome';

            device.shell(command);
            console.log((new Date).toISOString() + ' ' + command);
        });
};

client.listDevices()
    .then((devices: Device[]): void => {
        if (!devices || devices.length === 0) {
            throw new Error('Unable to find any android device.');
        }

        console.log((new Date).toISOString() + ' Connecting to a device at ' + devices[0].id);
        device = client.getDevice(devices[0].id);
    })
    .then(() => run())
    .then(() => setInterval(run, 1000 * 60 * 7));
