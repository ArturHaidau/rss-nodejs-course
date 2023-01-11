import robot from "robotjs";
import Jimp from "jimp";

export default () => new Promise((resolve, reject) => {
    try {
        const omitBufferHeader = buffer => buffer.substring(22);
        const {x, y} = robot.getMousePos();
        const rawBuffer = robot.screen.capture(x-100, y-100, 200, 200).image;
        new Jimp({ data: rawBuffer, width: 200, height: 200 }, async (err, image) => {
            if (err) reject(err); else {
                const base64Buffer = await image.getBase64Async(Jimp.MIME_PNG);
                console.log('The png buffer generated');
                resolve(`prnt_scrn ${omitBufferHeader(base64Buffer)}`);
            }
        });
    } catch (e) {
        reject(e);
    }
});