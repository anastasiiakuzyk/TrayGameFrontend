import React, {useCallback, useEffect, useState} from 'react';

export interface Key {
    top: boolean;
    bottom: boolean;
    right: boolean;
    left: boolean;
}

export default class KeyBoardListener {
    public top = false;
    public left = false;
    public bottom = false;
    public right = false;
    private listeners: ((cur: any) => void)[] = [];

    public listen(f: (cur: any) => void) {
        this.listeners.push(f);
    }

    private next(val: any) {
        let tmp = {
            top: this.top,
            left: this.left,
            right: this.right,
            bottom: this.bottom,
        };
        tmp = Object.assign(tmp, val);
        if (val !== this) {
            this.bottom = tmp.bottom;
            this.right = tmp.right;
            this.left = tmp.left;
            this.top = tmp.top;
            this.listeners.map(v => v(tmp));
        }
    }

    constructor() {

        this.listen = this.listen.bind(this);
        window.addEventListener(
            "keydown", (e) => {
                if ((e.key === 'w' || e.key === 'ц' || e.key === 'ArrowUp') && !this.top && !this.bottom) {
                    this.next({top: true, bottom: false, left: false, right: false});
                } else if ((e.key === 's' || e.key === 'і' || e.key === 'ы' || e.key === 'ArrowDown') && !this.bottom && !this.top) {
                    this.next({bottom: true, top: false, right: false, left: false});
                } else if ((e.key === 'd' || e.key === 'в' || e.key === 'ArrowRight') && !this.right && !this.left) {
                    this.next({right: true, left: false, top: false, bottom: false});
                } else if ((e.key === 'a' || e.key === 'ф' || e.key === 'ArrowLeft')  && !this.left && !this.right) {
                    this.next({left: true, right: false, top: false, bottom: false});
                }

            }, false
        );
    }
}
