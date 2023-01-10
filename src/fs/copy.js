import path from "path";
import url from "url";
import fsPromises from "fs/promises";
import isExist from "./isExist.js";

export const copy = async () => {
    const currentDir = path.dirname(url.fileURLToPath(import.meta.url));
    const srcFolderPath = path.join(currentDir, 'files');
    const destFolderPath = path.join(currentDir, 'files_copy');
    if (!(await isExist(srcFolderPath)) || (await isExist(destFolderPath))) throw new Error('FS operation failed'); else {
        await fsPromises.cp(srcFolderPath, destFolderPath, {recursive: true});
        console.log('FS operation succeeded');
    }
};
