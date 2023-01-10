import zlib from "zlib";
import path from "path";
import url from "url";
import fs from "fs";

export const compress = async () => {
    const currentDir = path.dirname(url.fileURLToPath(import.meta.url));
    const srcPath = path.join(currentDir, 'files', 'fileToCompress.txt');
    const destPath = path.join(currentDir, 'files', 'archive.gz');
    const gzip = zlib.createGzip();
    const source = fs.createReadStream(srcPath);
    const destination = fs.createWriteStream(destPath);
    source.pipe(gzip).pipe(destination);
};