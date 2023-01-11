import robot from "robotjs";

const drawCircle = radius => {
    let {x: curX, y: curY} = robot.getMousePos();
    const cx = curX + radius;
    const cy = curY;
    const drawArc = direction => {
        for(let step = 0; step < 2*radius - 1; step++) {
            curX += direction;
            curY = cy - Math.sqrt(radius*radius - (curX - cx)*(curX - cx))*direction;
            robot.moveMouseSmooth(curX, curY);
        }
    };
    drawArc(1);
    drawArc(-1);
};

const drawRectangle = (length, width) => {
    let {x: curX, y: curY} = robot.getMousePos();
    const drawPart = (dirX, dirY) => {
        for(let step = 1; step <= width; step++) {
            curY += dirY;
            robot.moveMouseSmooth(curX, curY);
        }
        for(let step = 1; step <= length; step++) {
            curX += dirX;
            robot.moveMouseSmooth(curX, curY);
        }
    };
    drawPart(1, 1);
    drawPart(-1, -1);
};

export default (op, args) => {
    robot.mouseToggle('down');
    if (op === 'draw_circle') drawCircle(args[0]);
    else if (op === 'draw_rectangle') drawRectangle(args[1], args[0]);
    else if (op === 'draw_square') drawRectangle(args[0], args[0]);
    robot.mouseToggle('up');
    console.log('The figure drawn!');
    return op;
};