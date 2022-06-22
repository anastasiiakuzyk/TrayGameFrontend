import KeyBoardListener, {Key} from "./keyboardListner";
import WebSocketUtil from "./ws/Socket";
import {IMap, IPlayer} from "../components/PIXI/GameStage";
import {UpdatePosData} from "./ws/Types";

export interface IUpdatePos {
    alive: boolean;
    map: IMap;
}

export default class Engine {

    private keyboardListener: KeyBoardListener;
    private websocket: WebSocketUtil;
    private keyboard: Key | undefined;
    private gameStarted = false;
    public width: number = 1000;
    public height: number = 500;

    private updateListeners: ((up: IUpdatePos) => void)[] = [];
    private updatePlayersListeners: ((players: IPlayer[]) => void)[] = [];
    private gameEndListeners: ((player: IPlayer) => void)[] = [];
    private players: IPlayer[] = [];

    public updateListen(f: (up: IUpdatePos) => void) {
        this.updateListeners.push(f);
    }

    public gameEndListener(f: (player: IPlayer) => void) {
        this.gameEndListeners.push(f);
    }

    private gameEnd(player: IPlayer) {
        this.gameEndListeners.map(listener => listener(player));
    }

    public updatePlayersListen(f: (up: IPlayer[]) => void) {
        this.updatePlayersListeners.push(f);
    }

    private nextPlayers(players: IPlayer[]) {
        this.players = players;
        this.updatePlayersListeners.map(listener => listener(players));
    }

    public getCurrentPlayer(): string {
        return this.websocket.uuid;
    }

    private comparePlayers(a1: IPlayer[], a2: IPlayer[]) {
        return a1.length !== a2.length
    }

    private nextPos(pos: IUpdatePos) {
        this.updateListeners.map(listener => listener(pos));
        if (this.comparePlayers(pos.map.players, this.players)) {
            this.nextPlayers(pos.map.players);
        }
        if (!pos.alive) {
            this.gameEnd(pos.map.players.find(p => p.uuid === this.getCurrentPlayer())!)
        }
    }

    constructor(keyboardListener: KeyBoardListener, websocket: WebSocketUtil) {
        this.keyboardListener = keyboardListener;
        this.websocket = websocket;

        this.setKeyboard = this.setKeyboard.bind(this);
        this.nextPos = this.nextPos.bind(this);
        this.startGame = this.startGame.bind(this);
        this.nextPlayers = this.nextPlayers.bind(this);

        this.keyboardListener.listen(cur => {
            this.setKeyboard(cur);
        });
        
        this.websocket.messageListener((message) => {
            this.nextPos(message);
        });
    }

    public startGame() {
        this.gameStarted = true;

        this.keyboardListener.listen(cur => {
            this.setKeyboard(cur);
            this.websocket.send({
                uuid: this.websocket.uuid,
                left: cur.left,
                right: cur.right,
                top: cur.top,
                bottom: cur.bottom,
            });
        });
    }

    private setKeyboard(k: Key) {
        this.keyboard = k;
    }


}