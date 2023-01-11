import {httpServer} from './src/http_server/index.js';
import {WebSocketServer} from 'ws';
import navigateMouse from "./src/websocket_server/navigateMouse.js";
import drawFigure from "./src/websocket_server/drawFigure.js";
import sendScreen from "./src/websocket_server/sendScreen.js";
import 'dotenv/config';

console.log(`Start static http server on the ${process.env.HTTP_SERVER_PORT} port!`);
console.log(`Start websocket server on the ${process.env.WEBSOCKET_SERVER_PORT} port!`);
httpServer.listen(process.env.HTTP_SERVER_PORT);
const wss = new WebSocketServer({port: process.env.WEBSOCKET_SERVER_PORT});

wss.on('connection', ws => {
    ws.on('message', async message => {
        console.log('Received: %s', message);
        const [op, ...args] = message.toString().split(' ');
        let response;
        if (['mouse_up', 'mouse_down', 'mouse_left', 'mouse_right', 'mouse_position'].includes(op)) response = navigateMouse(op, +args[0]);
        else if (['draw_circle', 'draw_rectangle', 'draw_square'].includes(op)) response = drawFigure(op, args.map(x => +x));
        else if (op === 'prnt_scrn') response = await sendScreen(ws);
        else throw new Error(`No such operation: ${op}`);
        ws.send(`${response} \0`);
    });
});

wss.on('close', () => {
    wss.clients.forEach(ws => {
        if (ws.isAlive === false) return ws.terminate(); else {
            ws.isAlive = false;
            ws.ping();
        }
    });
});
