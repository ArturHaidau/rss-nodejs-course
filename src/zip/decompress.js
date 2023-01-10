import path from "path";
import url from "url";
import zlib from "zlib";
import fs from "fs";

export const decompress = async () => {
    const currentDir = path.dirname(url.fileURLToPath(import.meta.url));
    const source = fs.createReadStream(path.join(currentDir, 'files', 'archive.gz'));
    const destination = fs.createWriteStream(path.join(currentDir, 'files', 'fileToCompress.txt'));
    const gunzip = zlib.createUnzip();
    source.pipe(gunzip).pipe(destination);
};