import path from "path";
import url from "url";
import fsPromises from "fs/promises";
import isExist from "./isExist.js";

export const list = async () => {
    const srcPath = path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'files');
    if (!(await isExist(srcPath))) throw new Error('FS operation failed'); else {
        const files = await fsPromises.readdir(srcPath);
        console.log(files);
        console.log('FS operation succeeded');
    }
};
