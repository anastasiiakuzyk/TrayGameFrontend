import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import Modal from "./modal";
import Header from "./Header/Header";

import GameStage, {IPlayer} from "./PIXI/GameStage";
import KeyBoardListener from "../core/keyboardListner";
import WebSocketUtil from "../core/ws/Socket";
import Engine from "../core/engine";
import ModalScore from "./ModalScore/ModalScore";
import {User} from "./Telegram/TelegramLoginButton";

export default function Main(): ReactElement {
    const [isOpenModal, setIsOpenModal] = useState(true);
    const [diedPlayer, setDiedPlayer] = useState<IPlayer | undefined>(undefined);
    const keyboardListener = new KeyBoardListener();
    const ws = new WebSocketUtil();

    const connection = useCallback((user: User) => {
        localStorage.setItem("user", JSON.stringify(user));
        fetch('http://localhost:8080/start', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).then(res => res.json()).then(res => {
            localStorage.setItem("gameUUID", res.uuid);
            if (res.code === 200) {
                ws.connect('ws://localhost:8080/ws', res.uuid)
            }
        });
    }, [ws])

    ws.stateListener((state) => {
        console.log(state);
    });
    useEffect(() => {
        console.log('State changed');
    })

    return (<div className="game__overlay">
        <EngineHOC gameOver={setDiedPlayer} ws={ws} keyboardListener={keyboardListener} />
        <Modal isOpen={isOpenModal}
               response={(user: User) => {connection(user); setIsOpenModal(false);}}/>
        <ModalScore
            kills={diedPlayer !== undefined ? diedPlayer.kills : 0}
            isOpen={diedPlayer !== undefined}
            close={() => {setDiedPlayer(undefined); setIsOpenModal(true);}}/>
    </div>);
}

interface IEngineHOCProps {
    keyboardListener: KeyBoardListener;
    ws: WebSocketUtil;
    gameOver: (diedPlayer: IPlayer) => void;
}

const EngineHOC = (props: IEngineHOCProps) => {
    const {keyboardListener, ws, gameOver} = props;

    const engine = new Engine(keyboardListener, ws);

    engine.gameEndListener(player => {
        gameOver(player)
    });

    return (<>
        <GameStage engine={engine} />
        <Header engine={engine}/>
    </>);
};
