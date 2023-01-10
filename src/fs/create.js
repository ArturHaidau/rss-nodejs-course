import fsPromises from 'fs/promises';
import path from 'path';
import url from 'url';
import isExist from "./isExist.js";

export const create = async () => {
    const pathToNewFile = path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'files', 'fresh.txt');
    if (await isExist(pathToNewFile)) throw new Error('FS operation failed'); else {
        await fsPromises.writeFile(pathToNewFile, 'I am fresh and young');
        console.log('FS operation succeeded');
    }
};
