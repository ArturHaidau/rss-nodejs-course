import path from "path";
import url from "url";
import fsPromises from "fs/promises";
import isExist from "./isExist.js";

export const remove = async () => {
    const srcPath = path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'files', 'fileToRemove.txt');
    if (!(await isExist(srcPath))) throw new Error('FS operation failed'); else {
        await fsPromises.rm(srcPath);
        console.log('FS operation succeeded');
    }
};
