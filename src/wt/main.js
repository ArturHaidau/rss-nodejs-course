import { Worker } from "worker_threads";
import path from "path";
import url from "url";
import os from "os";

const run = () => new Promise((resolve, reject) => {
    const START_VALUE = 10;
    const WORKERS_COUNT = os.cpus().length;
    const responses = [];
    let responsesCount = 0;
    const incResponsesCount = () => {
        responsesCount++;
        if (responsesCount === WORKERS_COUNT) {
            const result = responses.sort((a, b) => a.id - b.id).map(({id, ...rest}) => rest);
            resolve(result);
        }
    };
    for(let i = 0; i < WORKERS_COUNT; i++) {
        try {
            const worker = new Worker(path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'worker.js'));
            const value = START_VALUE + i;
            worker.postMessage(value);
            worker.on('message', response => {
                responses.push({id: worker.threadId, status: 'resolved', data: response});
                incResponsesCount();
            });
            worker.on('error', () => {
                responses.push({id: worker.threadId, status: 'error', data: null});
                incResponsesCount();
            });
        } catch (e) {
            reject(e);
        }
    }
});

export const performCalculations = async () => {
    return await run();
};