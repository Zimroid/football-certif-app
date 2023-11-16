export interface StandingsResponse {
    response: Array<{
        league: {
            standings: Array<
                Array<{
                    all: { draw: number, lose: number, played: number, win: number },
                    goalsDiff: number,
                    points: number,
                    team: {
                        id: number,
                        name: string,
                        logo: string,
                    },
                    rank: number,
                }>
            >
        },
    }>,
}