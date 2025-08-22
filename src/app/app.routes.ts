import { Routes } from '@angular/router';
import { VulnerabilityReportOverview } from './vulnerability-reports/overview/vuln-report-overview';
import { SbomReportOverview } from './sbom-reports/overview/sbom-report-overview';
import { DetailedVulnerabilityReport } from './vulnerability-reports/detailed/detailed-vuln-report';
import { LoginComponent } from './login/login';
import { Sidenav } from './shared/sidenav/sidenav';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '',
    component: Sidenav,
    children: [
      {
        path: 'vulnerability-reports-overview',
        component: VulnerabilityReportOverview,
      },
      { path: 'vulnerability-report', component: DetailedVulnerabilityReport },
      { path: 'sbom-reports-overview', component: SbomReportOverview },
    ],
  },
];
