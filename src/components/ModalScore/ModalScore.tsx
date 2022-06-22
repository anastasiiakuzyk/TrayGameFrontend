import React, {useState} from 'react';
import "./ModalScore.css"
import PrimaryButton from '../buttons/PrimaryButton';
import {useHistory} from "react-router-dom";

export interface IModalScoreProps {
    kills: number;
    isOpen: boolean;
    close: () => void;
}

export default function ModalScore(props: IModalScoreProps) {
    const {isOpen, close, kills} = props;
    const history = useHistory();

    return (
        <>
            {isOpen &&
            <div className="modal__wrapper">
                <div className="modalScore">
                    <h1>Results</h1>
                    <div className="hr"/>
                    <table>
                        <thead>
                            <tr>
                                <th>Kills</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th><b>{kills}</b></th>
                            </tr>
                        </tbody>
                        <div className={"stats__button"} onClick={() => history.push("/stats")}>Open Statistics</div>
                    </table>
                    <div className="modalScore__primaryButton-wrapper">
                        <PrimaryButton onClick={close}>Main Menu</PrimaryButton>
                    </div>
                </div>
            </div>
            }
        </>);
}