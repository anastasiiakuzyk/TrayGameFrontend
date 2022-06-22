import React, {ReactElement} from "react";
import classes from "./Alert.module.css"
import {CSSTransition} from "react-transition-group";


export interface AlertProps {
    children: string;
    isOpen: boolean;
    close: () => void;
    type: string;
}

export function ucFirst(str: string) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
}


export default function Alert(props: AlertProps): ReactElement {
    const {type, isOpen, children, close} = props;
    const cls = [classes.Alert, classes[type]]
    const textType = ucFirst(type)

    setTimeout(() => {
        close()
    }, 5000)

    return (
        <CSSTransition
            in={isOpen}
            timeout={400}
            classNames="alert"
            unmountOnExit
            mountOnEnter
        >
            <div className={classes.AlertWrapper}>
                <div className={cls.join(' ')}>
                    <p><b>{textType}!</b> {children}</p>
                    <button onClick={() => close()}>&times;</button>
                </div>
            </div>
        </CSSTransition>
    );
}