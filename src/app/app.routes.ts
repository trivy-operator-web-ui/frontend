import { Routes } from '@angular/router';
import { DetailedVulnerabilityReport } from './detailed-vuln-report/detailed-vuln-report';
import { VulnerabilityReportOverview } from './vuln-report-overview/vuln-report-overview';

export const routes: Routes = [
    { path: 'vulnreport/:uid', component: DetailedVulnerabilityReport },
    { path: 'vulnreport', component: VulnerabilityReportOverview },
    { path: '', redirectTo: '/vulnreport', pathMatch: 'full'}
];
