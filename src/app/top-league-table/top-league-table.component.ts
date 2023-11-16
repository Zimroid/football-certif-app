import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Standings } from '../interfaces/standings';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-league-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-league-table.component.html',
  styleUrl: './top-league-table.component.scss',
})
export class TopLeagueTableComponent {
  @Input({ required: true }) public isLoading = false;
  @Input({ required: true }) public standings: Array<Standings> = [];
}
