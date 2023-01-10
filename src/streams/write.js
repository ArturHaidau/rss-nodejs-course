import path from "path";
import url from "url";
import fsPromises from "fs/promises";

export const write = async () => {
    const filePath = path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'files', 'fileToWrite.txt');
    const file = await fsPromises.open(filePath, 'a');
    const stream = file.createWriteStream();
    process.stdin.pipe(stream);
};