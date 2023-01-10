import cp from "child_process";
import path from "path";
import url from "url";

export const spawnChildProcess = async (args) => {
    const scriptPath = path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'files', 'script.js');
    const childProcess = cp.fork(scriptPath, args, {stdio: ['pipe', 'pipe', 'pipe', 'ipc']});
    process.stdin.pipe(childProcess.stdin);
    childProcess.stdout.pipe(process.stdout);
};
