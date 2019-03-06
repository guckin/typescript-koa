import * as supertest from 'supertest';
import {server} from '../../lib/server';

// this starts our test web server instance so that integration tests can be served
const request = supertest(server);

export const callGet = (url: string) => {
    return request
    .get(url)
    .set({ 'content-type': 'application/json' });
};

export const callGetWithAuth = (url: string, token: string) => {
    return request
    .get(url)
    .set({ 'content-type': 'application/json' })
    .set('Authorization', 'Bearer ' + token);
};

export const callPostWithAuth = (url: string, token: string, testBody: any) => {
    return request
        .post(url)
        .set({ 'content-type': 'application/json' })
        .set('Authorization', 'Bearer ' + token)
        .send(testBody);
};

// this allows a testing module to call this function, 
// so that the int test web server can be shut down gracefully
export const closeTestServer = () => {
    return new Promise(resolve => {
        server.close(() => {
            resolve();
        });
    });
};
