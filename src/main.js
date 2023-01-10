import os from "os";
import path from "path";
import * as utils from "./utils.js";

const userName = utils.retrieveUserName(process.argv);
let currentDirectory = os.homedir();

const resolveWithCurDir = target => path.resolve(currentDirectory, target);

const finishProcess = () => {
    console.log(`Thank you for using File Manager, ${userName}!`);
    process.exit(0);
};

const processFSOp = async (opName, args) => {
    const src = args[0] && resolveWithCurDir(args[0]);
    const dest = args[1] &&
        (opName === 'rn' ? resolveWithCurDir(args[1]) : resolveWithCurDir(path.join(args[1], path.basename(args[0]))));
    if (opName === 'up') currentDirectory = utils.goUp(currentDirectory);
    else if (opName === 'ls') await utils.printContentOf(currentDirectory);
    else if (opName === 'cd') currentDirectory = await utils.go(src);
    else if (opName === 'cat') await utils.printFileContent(src);
    else if (opName === 'add') await utils.createFile(src);
    else if (opName === 'rn') await utils.renameFile(src, dest);
    else if (opName === 'cp') await utils.copyFile(src, dest);
    else if (opName === 'mv') await utils.moveFile(src, dest);
    else if (opName === 'rm') await utils.removeFile(src);
};

const processOSOp = arg => {
    if (arg === '--EOL') utils.printEOL();
    else if (arg === '--cpus') utils.printCPUsInfo();
    else if (arg === '--homedir') utils.printHomedir();
    else if (arg === '--username') utils.printSystemUserName();
    else if (arg === '--architecture') utils.printCPUArchInfo();
};

const processHashOp = async arg => {
    await utils.printHashOf(resolveWithCurDir(arg));
};

const processCompressOp = async (opName, args) => {
    const src = resolveWithCurDir(args[0]);
    const dest = resolveWithCurDir(args[1]);
    if (opName === 'compress') await utils.compress(src, dest);
    else if (opName === 'decompress') await utils.decompress(src, dest);
};

const processOp = async chunk => {
    const [opName, ...args] = chunk.toString().trim().split(/\s+/);
    let isInvalidInput = false;
    try {
        if (opName === '.exit') finishProcess();
        else if (['up', 'ls', 'cd', 'cat', 'add', 'rn', 'cp', 'mv', 'rm'].includes(opName)) await processFSOp(opName, args);
        else if (opName === 'os') processOSOp(args[0]);
        else if (opName === 'hash') await processHashOp(args[0]);
        else if (['compress', 'decompress'].includes(opName)) await processCompressOp(opName, args);
        else isInvalidInput = true;
    } catch (e) {
        throw new Error(`Operation failed: ${e.message}`);
    }
    if (isInvalidInput) throw new Error('Invalid input');
};

console.log(`Welcome to the File Manager, ${userName}!`);
utils.printCurrentDirectory(currentDirectory);

process.on('SIGINT', finishProcess);

process.stdin.on('data', async chunk => {
    try {
        await processOp(chunk);
    } catch (e) {
        console.error(e.message);
    }
    utils.printCurrentDirectory(currentDirectory);
});
