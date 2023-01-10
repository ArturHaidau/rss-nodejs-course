import path from "path";
import url from "url";
import fsPromises from "fs/promises";
import isExist from "./isExist.js";

export const read = async () => {
    const srcPath = path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'files', 'fileToRead.txt');
    if (!(await isExist(srcPath))) throw new Error('FS operation failed'); else {
        const content = await fsPromises.readFile(srcPath, {encoding: 'utf-8'});
        console.log(content);
        console.log('FS operation succeeded');
    }
};
