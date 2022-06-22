import React from 'react';
import {TelegramLoginButton, User} from './Telegram/TelegramLoginButton';
import {useUser} from "./Stats";
import {useHistory} from "react-router-dom";

export interface IModalProps {
    isOpen: boolean;
    response: (v: User) => void;
}

export default function Modal(props: IModalProps) {
    const {isOpen, response} = props;
    const { data: user } = useUser();
    const history = useHistory();

    return (
        <>
            {isOpen &&
            <div className="modal__wrapper">
                <div className="modal">
                    <h1>Welcome to
                        <span style={{color: '#e74c3c'}}> T</span>
                        <span style={{color: '#3498db'}}>r</span>
                        <span style={{color: '#f1c40f'}}>a</span>
                        <span style={{color: '#2ecc71'}}>y</span>
                        <span style={{color: '#9b59b6'}}>!</span>
                    </h1>
                    <div className="hr"/>
                    {user && (
                        <div className={"modal__nickname"}>
                            Play as&nbsp;<b onClick={() => history.push("/stats")}>{user.nickname}</b>
                        </div>
                    )}
                    <TelegramLoginButton
                        className="telegram__wrapper"
                        botName="traygamebot"
                        buttonSize="large"
                        cornerRadius={8}
                        dataOnauth={(user: User) => {
                            response(user);
                        }}
                    />
                </div>
            </div>
            }
        </>);
}