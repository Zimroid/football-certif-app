import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TopLeagueConfig } from './config';
import { TopLeagueTableComponent } from '../top-league-table/top-league-table.component';
import { ApiFootballService } from '../api-football.service';
import { Standings } from '../interfaces/standings';

@Component({
  selector: 'app-top-league-page',
  standalone: true,
  imports: [CommonModule, NavBarComponent, TopLeagueTableComponent],
  templateUrl: './top-league-page.component.html',
  styleUrl: './top-league-page.component.scss',
})
export class TopLeaguePageComponent implements OnInit, OnDestroy {
  public countryName = '';
  public countries = TopLeagueConfig.countries;
  public standings: Standings[] = [];
  public isLoading = false;
  private unsubscriber = new Subject<void>();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly apiFootball: ApiFootballService,
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(takeUntil(this.unsubscriber)).subscribe((params) => {
      this.changeName(params.get('countryName') ?? '');
    });
  }

  private changeName(newName: string): void {
    if (!newName) {
      return;
    }

    const currentCoutry = this.countries.find((country) => country.countryName === newName.toLocaleLowerCase());

    if (!currentCoutry) {
      this.router.navigate(['/']);
      return;
    }

    this.countryName = newName;

    this.loadStandings(currentCoutry.leagueId);
  }

  private loadStandings(leagueId: number): void {
    this.isLoading = true;

    this.apiFootball.getStandings(leagueId)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((standings) => {
        this.standings = standings;
        this.isLoading = false;
      })
  }

  public ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.unsubscribe();
  }
}
