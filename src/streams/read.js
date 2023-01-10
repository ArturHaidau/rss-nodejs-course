import path from "path";
import url from "url";
import fsPromises from "fs/promises";

export const read = async () => {
    const filePath = path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'files', 'fileToRead.txt');
    const file = await fsPromises.open(filePath);
    const stream = file.createReadStream();
    stream.pipe(process.stdout);
};