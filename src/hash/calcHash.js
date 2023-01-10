import fsPromises from "fs/promises";
import path from "path";
import url from "url";
import crypto from "crypto";

export const calculateHash = async () => {
    const srcPath = path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'files', 'fileToCalculateHashFor.txt');
    const data = await fsPromises.readFile(srcPath);
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
};
