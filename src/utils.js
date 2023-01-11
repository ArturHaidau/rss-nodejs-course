import {NotFoundError} from "./errors.js";

export const toArray = uri => uri.split('/');

export const isPathVariable = s => /{\w+}/.test(s);

const retrievePathArgs = (uri, pattern) => {
    const pathArgs = [];
    uri.forEach((segment, i) => {
        if (isPathVariable(pattern[i])) pathArgs.push(segment)
    });
    return pathArgs;
};

export const match = (uri, pattern) => {
    let result = uri.length === pattern.length;
    result && uri.forEach((segment, i) => {
        if (!isPathVariable(pattern[i]) && segment !== pattern[i]) result = false;
    });
    return result;
};

export const findRoute = (routes, {url, method}) => {
    const parsedURI = toArray(url.substring(1));
    const route = routes.find(({uri, method: patternMethod}) => match(parsedURI, toArray(uri)) && method === patternMethod);
    if (!route) throw new NotFoundError(`Request(${method} ${url}) can not be processed`);
    else return {route, pathArgs: retrievePathArgs(parsedURI, toArray(route.uri))};
};

export const isValidUUID = s => /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(s);

export const sendResponse = (res, statusCode, data) => {
    res.writeHead(statusCode, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
};

export const isUserValid = user => 'username' in user && 'age' in user && 'hobbies' in user;

export const createErrorBy = (name, message) => {
    const map = {
        'NotFoundError': NotFoundError,
    };
    return new map[name](message);
};