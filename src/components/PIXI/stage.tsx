import Engine from "../../core/engine";
import {colors} from "../Header/Header";


export default class StageInteractor {
    constructor(canvasEl: HTMLCanvasElement, engine: Engine, color: string) {
        canvasEl.width = 1280;
        canvasEl.height = 720;
        let context = canvasEl.getContext('2d');
        engine.startGame();
        engine.updateListen(update => {
            context!.clearRect(0, 0, 1280, 720);
            context!.shadowOffsetX = 0;
            context!.shadowOffsetY = 0;
            context!.shadowBlur = 20;

            update.map.players.sort(function (obj1: any, obj2: any) {
                if (obj1.uuid > obj2.uuid) {
                    return 1;
                }
                if (obj1.uuid < obj2.uuid) {
                    return -1;
                }
                return 0;
            })
            update.map.helpers.map(helper => {
                context!.beginPath();
                context!.rect(helper.position.x, helper.position.y, 10, 10)
                context!.fillStyle = "#9980FA";
                context!.closePath()
                context!.fill();
            })

            let idx = 0;
            update.map.players.map(player => {
                if (player.alive) {
                    if (idx > colors.length) idx = 0;
                    context!.fillStyle = colors[idx];
                    context!.shadowColor = colors[idx];
                    idx++;
                    context!.beginPath();
                    context!.shadowBlur = 0;
                    context!.font = "10pt Arial";
                    context!.fillText(player.nickname, player.position.x - 10, player.position.y - 20);
                    context!.arc(player.position.x, player.position.y, 13, 0, 2 * Math.PI, true);
                    context!.shadowBlur = 20;

                    let r = 4;
                    player.trajectory.map((item, index) => {
                        context!.closePath();
                        if (index % 10 === 0) context!.arc(item.x, item.y, r, 0, 2 * Math.PI, true);
                        if (r < 8) r += .1

                        //
                        // if (index % 10 === 0) {
                        //     context!.arc(item.x, item.y, 10, 0, 2 * Math.PI);
                        // }

                    });

                    context!.fill();
                }
            })




        });
    }

    /*private engine: Engine;
    private app: PIXI.Application;
    private stage: PIXI.Container;
    private players: Map<string, PIXI.Graphics> = new Map<string, PIXI.Graphics>();

    /*constructor(canvasEl: HTMLCanvasElement, engine: Engine) {
        this.addPlayer = this.addPlayer.bind(this);

        this.app = new PIXI.Application({
            view: canvasEl,
            width: engine.width,
            height: engine.height,
        });

        this.stage = new PIXI.Container();
        this.stage.width = engine.width;
        this.stage.height = engine.height;

        this.app.stage.addChild(this.stage);

        this.engine = engine;
        this.engine.startGame();

        this.engine.updateListen(update => {
            update.map.players.map(player => {
                let graphic = this.players.get(player.uuid);
                if (graphic === undefined) {
                    graphic = new PIXI.Graphics();
                    this.players.set(player.uuid, graphic);
                    this.stage.addChild(graphic);
                }

                graphic.x = player.position.x;
                graphic.y = player.position.y;
                graphic.beginFill(0xff0000);
                graphic.drawCircle( 0,0, 20);
                graphic.endFill();

            });
        });

    }

    private addPlayer(player: PIXI.Graphics) {
        //this.app.render(this.stage);
    } */

}