import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiFootballService } from '../api-football.service';
import { Subject, takeUntil } from 'rxjs';
import { Game } from '../interfaces/game';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.scss',
})
export class ResultsPageComponent implements OnInit, OnDestroy {
  public games: Game[] = [];
  private unsubscriber = new Subject<void>();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiFootball: ApiFootballService,
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(takeUntil(this.unsubscriber)).subscribe((params) => {
      this.loadLastResults(params.get('teamId') ?? '');
    });
  }

  private loadLastResults(teamId: string): void {
    this.apiFootball.getLast10Games(teamId)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((games) => {
        this.games = games;
      });
  }

  public ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.unsubscribe();
  }
}
