import React, {useEffect, useState} from 'react';

import * as PIXI from 'pixi.js';

import KeyBoardListener from "../../core/keyboardListner";

import "./index.css";
import Engine from "../../core/engine";
import StageInteractor from "./stage";

export interface IMap {
    width: number;
    height: number;
    players: IPlayer[];
    helpers: IHelpers[];
}

export enum HelperType {
    Saver = "saver",
    Booster = "booster"
}

export interface IHelpers {
    uuid: string;
    type: HelperType;
    position: IPos;
}

export interface IPlayer {
    uuid: string;
    nickname: string;
    alive: boolean;
    kills: number;
    position: IPos;
    trajectory: IPos[];
}

interface IPos {
    x: number;
    y: number
}

interface IGameStageProps {
    engine: Engine;
}

export default function GameStage(props: IGameStageProps) {
    const {engine} = props;

    const canvasEl = React.createRef<HTMLCanvasElement>();

    useEffect(() => {

        const colors = ['#2ecc71', '#e67e22', '#e74c3c', '#f39c12', '#f1c40f', '#16a085', '#8e44ad', '#ecf0f1']
        let rand = Math.floor(Math.random() * colors.length);

        if (canvasEl.current !== null) {
            const si = new StageInteractor(canvasEl.current, engine, colors[rand])
        }
    }, [canvasEl, engine]);


    return (
        <canvas ref={canvasEl} className="">

        </canvas>
    );
}