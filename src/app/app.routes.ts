import { Routes } from '@angular/router';
import { DetailedVulnerabilityReport } from './detailed-vuln-report/detailed-vuln-report';
import { VulnerabilityReportOverview } from './vuln-report-overview/vuln-report-overview';
import { SbomReportOverview } from './sbom-report-overview/sbom-report-overview';

export const routes: Routes = [
    { path: 'vulnreport/:uid', component: DetailedVulnerabilityReport },
    { path: 'vulnreport', component: VulnerabilityReportOverview },
    { path: 'sbomreport', component: SbomReportOverview },
    { path: '', redirectTo: '/vulnreport', pathMatch: 'full'}
];
