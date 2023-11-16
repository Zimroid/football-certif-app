import { Routes } from '@angular/router';
import { TopLeaguePageComponent } from './top-league-page/top-league-page.component';
import { ResultsPageComponent } from './results-page/results-page.component';

export const routes: Routes = [
    {
        path: '',
        component: TopLeaguePageComponent
    },
    {
        path: ':countryName',
        children: [
            {
                path: '',
                component: TopLeaguePageComponent,
            },
            {
                path: ':teamId',
                component: ResultsPageComponent,
            },
        ],
    },
];
