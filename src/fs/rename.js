import path from "path";
import url from "url";
import fsPromises from "fs/promises";
import isExist from "./isExist.js";

export const rename = async () => {
    const currentDir = path.dirname(url.fileURLToPath(import.meta.url));
    const oldPath = path.join(currentDir, 'files', 'wrongFilename.txt');
    const newPath = path.join(currentDir, 'files', 'properFilename.md');
    if (!(await isExist(oldPath)) || (await isExist(newPath))) throw new Error('FS operation failed'); else {
        await fsPromises.rename(oldPath, newPath);
        console.log('FS operation succeeded');
    }
};
