import path from "path";
import url from "url";

const currentDir = path.dirname(url.fileURLToPath(import.meta.url));

export default {
    entry: './src/app.js',
    target: 'node',
    mode: 'production',
    output: {
        filename: 'main.cjs',
        path: path.resolve(currentDir, 'dist'),
    }
};