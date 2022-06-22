import React, {ReactElement} from 'react';
import classes from './PrimaryButton.module.css'

export interface PrimaryButtonProps {
    children: string;
    onClick?: () => void;
}


export default function PrimaryButton(props: PrimaryButtonProps): ReactElement {
    const { children, onClick } = props;
    return (
        <div className={classes.PrimaryButton} onClick={onClick !== undefined ? () => onClick() : undefined }>
            {children}
        </div>
    );
}