
export interface PlayerData {
    number: number;
    name: string;
    position: { x: number; y: number };
    key: string;
}

export class Formation {
    name: string;
    players: PlayerData[];
    availableKeys: Set<string>;

    constructor(name: string, players: PlayerData[]) {
        this.name = name;
        this.players = players;
        this.availableKeys = new Set(players.map(player => player.key))
    }

    updatePlayerPosition(playerNumber: number, newPosition: { x: number; y: number }) {
        const player = this.players.find(p => p.number === playerNumber);
        if (player) {
            player.position = newPosition;
        }
    }

    getPlayerInfo(playerNumber: number): PlayerData | undefined {
        return this.players.find(p => p.number === playerNumber);
    }

    addPlayer(player: PlayerData) {
        this.players.push(player);
        this.availableKeys.delete(player.key); // Remove key from available set
    }

    removePlayer(player: PlayerData) {
        this.players.splice(this.players.indexOf(player), 1);
        this.availableKeys.add(player.key); // Add key back to available set for reuse
    }
}