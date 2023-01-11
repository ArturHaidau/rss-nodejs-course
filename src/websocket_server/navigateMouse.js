import robot from "robotjs";

export default (op, delta) => {
    let response = op;
    let {x, y} = robot.getMousePos();
    if (op === 'mouse_up') y -= delta;
    else if (op === 'mouse_down') y += delta;
    else if (op === 'mouse_left') x -= delta;
    else if (op === 'mouse_right') x += delta;
    else if (op === 'mouse_position') response = `mouse_position ${x},${y}`;
    robot.moveMouseSmooth(x, y);
    console.log(`Current x = ${x}, y = ${y}`);
    return response;
};