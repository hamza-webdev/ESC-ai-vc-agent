import { Routes } from '@angular/router';
import { PlayersComponent } from './players.component';

export const routes: Routes = [
  { path: 'players', component: PlayersComponent },
  { path: '', redirectTo: 'players', pathMatch: 'full' }
];
