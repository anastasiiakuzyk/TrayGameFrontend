import React, {useEffect, useRef} from 'react';

export interface User {
    auth_date: number;
    first_name?: string;
    second_name?: string;
    hash: string;
    id: number;
    photo_url: string;
    username: string;
}

interface TelegramLoginButtonProps {
    botName: string;
    buttonSize: string;
    cornerRadius: number;
    requestAccess?: string;
    usePic?: boolean;
    dataOnauth: (user: User) => void;
    className?: string;
    lang?: string;
    widgetVersion?: number;
}

export const TelegramLoginButton = (
    {
        botName,
        buttonSize,
        cornerRadius,
        requestAccess = "write",
        usePic = true,
        className,
        dataOnauth,
        lang = "en",
        widgetVersion = 19
    }: TelegramLoginButtonProps
) =>  {
    const instance = useRef<HTMLDivElement>(null);
    // @ts-ignore
    window.TelegramLoginWidget = {
        dataOnauth: (user: User) => dataOnauth(user),
    };

    useEffect(() => {
        if (instance.current !== null) {
            const script = document.createElement("script");
            script.src = "https://telegram.org/js/telegram-widget.js?" + widgetVersion;
            script.setAttribute("data-telegram-login", botName);
            script.setAttribute("data-size", buttonSize);
            script.setAttribute("data-radius", cornerRadius.toString());
            script.setAttribute("data-request-access", requestAccess);
            script.setAttribute("data-userpic", `${usePic}`);
            script.setAttribute("data-lang", lang);
            script.setAttribute(
                "data-onauth",
                "TelegramLoginWidget.dataOnauth(user)"
            );
            script.async = true;
            instance.current.appendChild(script);
        }
    }, [botName, buttonSize, cornerRadius, instance, lang, requestAccess, usePic, widgetVersion]);

    return (
        <div
            className={className}
            ref={instance}
        />
    );
}