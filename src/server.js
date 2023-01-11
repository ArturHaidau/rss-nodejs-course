import http from "http";
import * as handlers from "./handlers.js";
import {HTTP_STATUS} from "./application.constants.js";
import * as utils from "./utils.js";
import {InvalidUUIDError, NotFoundError, InvalidEntityError} from "./errors.js";
import "dotenv/config";

const routes = [
    {uri: 'api/users', method: 'GET', handle: handlers.getUsers},
    {uri: 'api/users/{id}', method: 'GET', handle: handlers.getUser},
    {uri: 'api/users', method: 'POST', handle: handlers.createUser},
    {uri: 'api/users/{id}', method: 'PUT', handle: handlers.updateUser},
    {uri: 'api/users/{id}', method: 'DELETE', handle: handlers.deleteUser},
];

const getRequestBody = req => new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {
        resolve(data.length > 0 ? JSON.parse(data) : data);
    });
    req.on('error', reject);
});

export const server = http.createServer(async (req, res) => {
    try {
        const requestBody = await getRequestBody(req);
        const {route, pathArgs} = utils.findRoute(routes, req);
        const {data, status} = await route.handle(...pathArgs, requestBody);
        utils.sendResponse(res, status, data);
    } catch (e) {
        console.error(e);
        const data = {message: e.message};
        let status;
        if (e instanceof InvalidUUIDError) status = HTTP_STATUS.BAD_REQUEST;
        else if (e instanceof NotFoundError) status = HTTP_STATUS.NOT_FOUND;
        else if (e instanceof InvalidEntityError) status = HTTP_STATUS.BAD_REQUEST;
        else status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        utils.sendResponse(res, status, data)
    }
});