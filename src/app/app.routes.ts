import { Routes } from '@angular/router';
import { DetailedReport } from './detailed-report/detailed-report';
import { Overview } from './overview/overview';

export const routes: Routes = [
    { path: ':uid', component: DetailedReport },
    { path: '', component: Overview },
];
