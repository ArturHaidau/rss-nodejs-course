import path from "path";
import fsPromises from "fs/promises";
import os from "os";
import crypto from "crypto";
import fs from "fs";
import zlib from "zlib";

export const retrieveUserName = array => array.find(x => x.startsWith('--username'))?.split('=')[1];

export const printCurrentDirectory = currentDirectory => console.log(`\nYou are currently in ${currentDirectory}`);

export const goUp = from => path.resolve(from, '..');

export const go = async to => {
    if ((await fsPromises.stat(to)).isDirectory()) return to;
    else throw new Error('No such directory');
};

export const printContentOf = async directory => {
    const files = await fsPromises.readdir(directory);
    files.forEach(x => console.log(x));
};

export const printFileContent = async path => {
    const content = await fsPromises.readFile(path, {encoding: 'utf-8'});
    console.log(content);
};

export const createFile = async path => {
    await fsPromises.writeFile(path, '', {flag: 'wx'});
    console.log('File created successfully');
};

export const renameFile = async (src, dest) => {
    await fsPromises.rename(src, dest);
    console.log('File renamed successfully');
};

export const copyFile = async (src, dest) => {
    await fsPromises.copyFile(src, dest, fs.constants.COPYFILE_EXCL);
    console.log('File copied successfully');
};

export const moveFile = async (src, dest) => {
    await fsPromises.rename(src, dest);
    console.log('File moved successfully');
};

export const removeFile = async path => {
    await fsPromises.rm(path);
    console.log('File removed successfully');
};

export const printEOL = () => {
    console.log(JSON.stringify(os.EOL));
};

export const printHomedir = () => {
    console.log(os.homedir());
};

export const printCPUsInfo = () => {
    const NUMBER_OF_BYTES = 1024;
    console.log(`Amount of logical cores = ${os.cpus().length}`);
    os.cpus()
        .map(({model, speed}) => `Model = ${model}, clock rate = ${(speed / NUMBER_OF_BYTES).toFixed(2)} GHz`)
        .forEach(x => console.log(x));
};

export const printSystemUserName = () => {
    console.log(os.userInfo().username);
};

export const printCPUArchInfo = () => {
    console.log(os.arch());
};

export const printHashOf = async filePath => {
    const data = await fsPromises.readFile(filePath);
    const hash = crypto.createHash('sha256');
    hash.update(data);
    console.log(hash.digest('hex'));
};

const streamFile = (src, dest, transform) => new Promise((resolve, reject) => {
    const source = fs.createReadStream(src);
    const destination = fs.createWriteStream(dest);
    const stream = source.pipe(transform).pipe(destination);

    stream.on('finish', resolve);
    source.on('error', reject);
    stream.on('error', reject);
    transform.on('error', reject);
});

export const compress = async (src, dest) => {
    const transform = zlib.createBrotliCompress();
    await streamFile(src, dest, transform);
    console.log('File compressed successfully');
};

export const decompress = async (src, dest) => {
    const transform = zlib.createBrotliDecompress();
    await streamFile(src, dest, transform);
    console.log('File decompressed successfully');
};
