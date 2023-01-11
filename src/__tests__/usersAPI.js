import request from "supertest";
import {server} from "../server.js";
import {HTTP_STATUS} from "../application.constants.js";
import crypto from "crypto";

describe('api/users', () => {
    const mockUser = {username: 'Artur', age: 25, hobbies: ['some hobby']};

    const get = async uri => await request(server).get(uri);
    const post = async (uri, body) => await request(server).post(uri).send(body);
    const _delete = async uri => await request(server).delete(uri);
    const put = async (uri, body) => await request(server).put(uri).send(body);

    const checkResponse = (response, {status, body}) => {
        expect(response.status).toStrictEqual(status);
        body && expect(response.body).toStrictEqual(body);
    };

    it('should pass scenario 1', async () => {
        checkResponse(await get('/api/users'), {status: HTTP_STATUS.OK, body: []});

        const response = await post('/api/users', mockUser);
        expect(response.status).toStrictEqual(HTTP_STATUS.CREATED);
        expect(response.body).toMatchObject(mockUser);

        const {id: userId} = response.body;
        checkResponse(await get(`/api/users/${userId}`), {status: HTTP_STATUS.OK, body: {id: userId, ...mockUser}});

        const updatedUserData = {...mockUser, age: 28, hobbies: []};
        checkResponse(await put(`/api/users/${userId}`, updatedUserData), {status: HTTP_STATUS.OK, body: {id: userId, ...mockUser, ...updatedUserData}});

        checkResponse(await _delete(`/api/users/${userId}`), {status: HTTP_STATUS.NO_CONTENT});

        checkResponse(await get(`/api/users/${userId}`), {status: HTTP_STATUS.NOT_FOUND});
    });

    it('should pass scenario 2', async () => {
        checkResponse(await get('/api/users/some_id'), {status: HTTP_STATUS.BAD_REQUEST});

        const response = await post('/api/users', mockUser);
        expect(response.status).toStrictEqual(HTTP_STATUS.CREATED);
        expect(response.body).toMatchObject(mockUser);

        const {id: userId} = response.body;
        checkResponse(await _delete(`/api/users/${userId}`), {status: HTTP_STATUS.NO_CONTENT});

        checkResponse(await get('/api/users'), {status: HTTP_STATUS.OK, body: []});
        checkResponse(await get(`/api/users/${userId}`), {status: HTTP_STATUS.NOT_FOUND});
        checkResponse(await post('/api/users', {age: 28}), {status: HTTP_STATUS.BAD_REQUEST});
        checkResponse(await post('/api/users', mockUser), {status: HTTP_STATUS.CREATED});

        const uuid = crypto.randomUUID();
        checkResponse(await get(`/api/users/${uuid}`), {status: HTTP_STATUS.NOT_FOUND});

        checkResponse(await put(`/api/users/${uuid}`, {age: 28}), {status: HTTP_STATUS.NOT_FOUND});
    });

    it('should pass scenario 3', async () => {
        checkResponse(await get('/some-non/existing/resource'), {status: HTTP_STATUS.NOT_FOUND});
    });
});
