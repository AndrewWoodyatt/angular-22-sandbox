import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { LogSession } from './log-session/log-session';
import { SessionHistory } from './session-history/session-history';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'log', component: LogSession },
  { path: 'history', component: SessionHistory },
  { path: '**', redirectTo: '' },
];
