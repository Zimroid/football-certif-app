export interface GameResponse {
    response: Array<{
        goals: {
            away: number,
            home: number,
        },
        teams: {
            away: {
                logo: string,
                name: string,
            },
            home: {
                logo: string,
                name: string,
            },
        },
    }>,
}