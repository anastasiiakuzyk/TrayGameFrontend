import {useEffect, useState} from "react";

export enum RequestType {
    Start = 'start'
}

enum RequestMethod {
    GET = 'GET',
    POST = 'POST'
}

enum RequestUrl {
    StartEndpoint = '/start'
}

export interface IStartRequest {
    type: RequestType.Start;
    url: RequestUrl.StartEndpoint;
    method: RequestMethod.GET;
    body: IStartRequestBody;
}
interface IStartRequestBody {
    username: string;
}

export interface IStartResponse {
    code: number;
    uuid: string;
}

export interface IErrorResponse {
    code: number;
    message: string;
}


type IRequest = IStartRequest;
type IResponse = IStartResponse;

class ResponseFactory {

}

export function makeHttp(request: IRequest): any {
    if (request.method === RequestMethod.GET) {
        let uri = '';
        let useQ = true;
        for (const key of Object.keys(request.body)) {
            if (useQ) {
                // @ts-ignore
                uri += '?' + key + '=' + request.body[key];
                useQ = false;
            }
            // @ts-ignore
            uri += '&' + key + '=' + request.body[key];
        }

        return fetch(request.url + uri).then(res => res.json()).then(resp => {
            if (resp.code !== 200) {

            }
        })
    }

}