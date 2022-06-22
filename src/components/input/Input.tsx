import React, {ReactElement, useEffect, useState} from 'react';

interface IInputProps {
    type: string;
    defaultValue?: string;
    placeholder?: string;
    value: string | undefined;
    setValue: (val: string | undefined) => void;
    required?: boolean;
}

export function Input(props: IInputProps): ReactElement {
    const {type, defaultValue, placeholder, value, setValue, required} = props;

    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        if (value !== undefined) {
            if (required && value.length === 0) {
                setValue(undefined);
            }
        }
        if(value === undefined || value.replace(/\s+/g, '').length < 3 || value.length > 12) {
            setIsError(true)
        } else {
            setIsError(false)
        }
    }, [value, isError] );

    let cls = "input";
    if(isTouched && isError) {
        cls += " input-error"
    }

    return (
        <input type={type}
               defaultValue={defaultValue}
               placeholder={placeholder}
               className={cls}
               value={value}
               onChange={e => { setValue(e.target.value); setIsTouched(true) }} />
    );
}