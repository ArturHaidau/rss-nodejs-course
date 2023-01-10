import path from 'path';
import { release, version } from 'os';
import {createServer as createServerHttp} from 'http';
import url from 'url';
import module from "module";
import('./files/c.js');

const random = Math.random();
const require = module.createRequire(import.meta.url);

export let unknownObject;

if (random > 0.5) {
    unknownObject = require('./files/a.json');
} else {
    unknownObject = require('./files/b.json');
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${url.fileURLToPath(import.meta.url)}`);
console.log(`Path to current directory is ${path.dirname(url.fileURLToPath(import.meta.url))}`);

export const createMyServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});
