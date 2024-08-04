import { 
    Routes, Route } from '@angular/router';
import { DiscreteComponent } from './discrete/discrete.component';


const root: Route = { path: '', redirectTo: '/discrete', pathMatch: 'full' };
const discrete: Route = { path: 'discrete', component: DiscreteComponent };


export const routes: Routes = [
    root,
    discrete
];
