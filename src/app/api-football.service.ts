import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { Standings } from './interfaces/standings';
import { StandingsResponse } from './interfaces/standings-response';
import { Game } from './interfaces/game';
import { GameResponse } from './interfaces/games-response';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class ApiFootballService {
  private baseUrl = 'https://v3.football.api-sports.io';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly cache: CacheService,
  ) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': 'f1a1b8aa8f281b4a934a85c9e5d9b7b1'
    })
  }

  private getAndCache<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url, { headers: this.getHeaders() })
      .pipe(tap(response => {
        this.cache.cacheUrl(url, response);
      }));
  }

  private getFromUrl<T>(url: string): Observable<T> {
    const fromCache = this.cache.retrieveFromCache<T>(url)
    if (fromCache) {
      return of(fromCache);
    }

    return this.getAndCache(url);
  }

  public getStandings(leagueId: number): Observable<Standings[]> {
    const url = `${this.baseUrl}/standings?league=${leagueId}&season=${new Date().getFullYear()}`;
    return this.getFromUrl<StandingsResponse>(url)
      .pipe(map((res) => {
        return res.response[0].league.standings[0].map((standing) => {
          return {
            teamId: standing.team.id,
            rank: standing.rank,
            name: standing.team.name,
            logoUrl: standing.team.logo,
            nbGamesPlayed: standing.all.win + standing.all.lose + standing.all.draw,
            nbWins: standing.all.win,
            nbLosses: standing.all.lose,
            nbDraws: standing.all.draw,
            nbGoalDifference: standing.goalsDiff,
            nbPoints: standing.points
          }
        });
      }));
  }

  public getLast10Games(teamId: string): Observable<Game[]> {
    const url = `${this.baseUrl}/fixtures?last=10&team=${teamId}`;
    return this.getFromUrl<GameResponse>(url)
      .pipe(map((res) => {
        return res.response.map((game) => {
          return {
            home: {
              logoUrl: game.teams.home.logo,
              name: game.teams.home.name,
              score: game.goals.home,
            },
            away: {
              logoUrl: game.teams.away.logo,
              name: game.teams.away.name,
              score: game.goals.away,
            }
          }
        });
      }));
  }
}
