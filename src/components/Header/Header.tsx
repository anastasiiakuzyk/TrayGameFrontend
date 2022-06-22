import React, {ReactElement, useState} from "react";
import classes from "./Header.module.css"
import Alert from "../Alert/Alert";
import Preloader from "../Preloader/Preloader";
import '../../animations.css'
import Engine from "../../core/engine";
import {Simulate} from "react-dom/test-utils";

//import play = Simulate.play;

export interface playersProps {
    username: string;
    kills: number;
}

export const colors = ['#fff', '#e67e22', '#e74c3c',
    '#f39c12', '#f1c40f']

export interface HeaderProps {
    engine: Engine;
}

export default function Header(props: HeaderProps): ReactElement {
    const {engine} = props;

    const [playersListener, setPlayersListener] = useState<any>(undefined)

    engine.updatePlayersListen(players => {
        let player = new Array();
        players.map((item) => {
            player.push({
                nickname: item.nickname,
                kills: item.kills,
            })
        })
        setPlayersListener(player)
    });
    const [isOpenAlert, setIsOpenAlert] = useState(true);
    const [isOpenPreloader, setIsOpenPreloader] = useState(false);

    let players = playersListener;
    const length = colors.length
    if(players !== undefined) {
        players.sort(function (obj1: any, obj2: any) {
            if (obj1.uuid > obj2.uuid) {
                return 1;
            }
            if (obj1.uuid < obj2.uuid) {
                return -1;
            }
            return 0;
        })
            .forEach((item: any, index: number) => {
                item.color = colors[index % length]
            })
        players.sort(function (obj1: any, obj2: any) {
            return obj2.kills - obj1.kills;
        });
    }

    setTimeout(() => {
        setIsOpenPreloader(false);
    }, 2000)

    return (
        <div className={classes.Header}>
            <Alert isOpen={isOpenAlert}
                   close={() => {
                       setIsOpenAlert(false);
                   }}
                   type="success">
                Welcome!
            </Alert>
            {isOpenPreloader && <Preloader/>}
            <div className={classes.HeaderTable}>
                <table>
                    <thead>
                    <tr>
                        <th>Player</th>
                        <th>kills</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players !== undefined && players.map((item: any, index: number) => {
                        return (
                            <tr key={index}>
                                <th>
                                    <div style={{color: item.color}}>
                                        <div style={{backgroundColor: item.color}}/>{item.nickname}
                                    </div>
                                </th>
                                <th style={{color: item.color}}>{item.kills}</th>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}