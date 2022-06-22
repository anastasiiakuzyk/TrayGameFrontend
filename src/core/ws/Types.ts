
export enum PayloadType {
    gameEnd = "game_end",
    gameSync = "game_sync"
}

export interface Payload {
    type: PayloadType;
    data: UpdatePosData | UpdateClientData;
}

export interface UpdatePosData {
    UUID: string;
    vector: number;
}

export interface UpdateClientData {
    alive: boolean;

}