import { Transform } from "stream";

export const transform = async () => {
    const reverseTransform = new Transform({
        transform(chunk, _, callback) {
            this.push(chunk.toString().split('').reverse().join('').concat('\n'));
            callback();
        }
    });
    process.stdin.pipe(reverseTransform).pipe(process.stdout);
};