import * as utils from "./utils.js";
import {HTTP_STATUS} from "./application.constants.js";
import {InvalidUUIDError, InvalidEntityError} from "./errors.js";
import ProcessCommunication from "./ProcessCommunication.js";

const checkId = id => {
    if (!utils.isValidUUID(id)) throw new InvalidUUIDError(`Provided UUID(${id}) is invalid`);
}
const checkUser = user => {
    if (!utils.isUserValid(user))
        throw new InvalidEntityError(`Provided user is invalid. Required [username, age, hobbies]`);
}

export const getUsers = async () => ({data: await ProcessCommunication.requestDB('getUsers'), status: HTTP_STATUS.OK});

export const getUser = async id => {
    checkId(id);
    return {data: await ProcessCommunication.requestDB('getUser', id), status: HTTP_STATUS.OK};
};

export const createUser = async user => {
    checkUser(user);
    return ({data: await ProcessCommunication.requestDB('createUser', user), status: HTTP_STATUS.CREATED});
};

export const updateUser = async (id, data) => {
    checkId(id);
    return {data: await ProcessCommunication.requestDB('updateUser', id, data), status: HTTP_STATUS.OK};
};

export const deleteUser = async id => {
    checkId(id);
    return {data: await ProcessCommunication.requestDB('deleteUser', id), status: HTTP_STATUS.NO_CONTENT};
};