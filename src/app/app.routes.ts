import { 
    Routes, Route } from '@angular/router';
import { DiscreteComponent } from './component/discrete/discrete.component';
import { LogsComponent } from './component/logs/logs.component';
import { ApiComponent } from './component/api/api.component';
import { ContinuousComponent } from './component/continuous/continuous.component';



const root: Route = { path: '', redirectTo: '/discrete', pathMatch: 'full' };
const discrete: Route = { path: 'discrete', component: DiscreteComponent };
const logs: Route = { path: 'logs', component: LogsComponent};
const api: Route = { path: 'api', component: ApiComponent };
const continuous: Route = { path: 'continuous', component: ContinuousComponent };
const all: Route = { path: '**', redirectTo: '/discrete', pathMatch: 'full' };


export const routes: Routes = [
    root,
    discrete,
    logs,
    api,
    continuous,
    all
];
