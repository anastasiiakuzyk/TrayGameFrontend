import {useEffect, useState} from "react";
import {UpdateClientData, UpdatePosData} from "./Types";

export enum WSState {
    Connected = 'connected',
    Closed = 'closed',
}

export default class WebSocketUtil {
    public state: WSState = WSState.Closed;
    public uuid: string = "";
    private ws: WebSocket | undefined = undefined;
    private stateListeners: ((state: WSState) => void)[] = [];
    private messageListeners: ((mes: any) => void)[] = [];

    constructor() {
        this.nextMessage = this.nextMessage.bind(this);
        this.nextState = this.nextState.bind(this);
        this.send = this.send.bind(this);
    }

    public stateListener(f: (state: WSState) => void) {
        this.stateListeners.push(f);
    }

    private nextState(state: WSState) {
        if (state !== this.state) {
            this.stateListeners.map(listener => listener(state));
        }
    }

    public messageListener(f: (mes: any) => void) {
        this.messageListeners.push(f);
    }

    private nextMessage(mes: any) {
        this.messageListeners.map(listener => listener(mes));
    }

    public connect(url: string, uuid: string) {
        if (WSState.Closed !== this.state) {
            return;
        }
        this.ws = new WebSocket(url + "?uuid=" + uuid);
        this.uuid = uuid;

        this.ws.onopen = (e) => {
           this.nextState(WSState.Connected);
        };

        this.ws.onmessage = (e) => {
            this.nextMessage(JSON.parse(e.data));
        };

        this.ws.onclose = (e) => {
            this.nextState(WSState.Closed)
        };

        this.stateListener(state => {
            this.state = state;
        })
    }

    public send(data: any) {
        if (this.ws !== undefined) {
            if (this.ws.readyState === this.ws.OPEN) {
                this.ws!.send(JSON.stringify(data));
            }
        }
    }

    public close() {
        if (this.ws !== undefined) {
            this.ws.close();
        }
    }
}