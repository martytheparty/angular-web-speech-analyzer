import { 
    Routes, Route } from '@angular/router';
import { DiscreteComponent } from './discrete/discrete.component';
import { LogsComponent } from './logs/logs.component';
import { ApiComponent } from './api/api.component';
import { ContinuousComponent } from './continuous/continuous.component';


const root: Route = { path: '', redirectTo: '/discrete', pathMatch: 'full' };
const discrete: Route = { path: 'discrete', component: DiscreteComponent };
const logs: Route = { path: 'logs', component: LogsComponent};
const api: Route = { path: 'api', component: ApiComponent };
const continous: Route = { path: 'continuous', component: ContinuousComponent };
const all: Route = { path: '**', redirectTo: '/discrete', pathMatch: 'full' };


export const routes: Routes = [
    root,
    discrete,
    logs,
    api,
    continous,
    all
];
