import { Routes } from '@angular/router';
import { VulnerabilityReportOverview } from './vulnerability-reports/overview/vuln-report-overview';
import { SbomReportOverview } from './sbom-reports/overview/sbom-report-overview';
import { DetailedVulnerabilityReport } from './vulnerability-reports/detailed/detailed-vuln-report';
import { LoginComponent } from './login/login';
import { Sidenav } from './shared/sidenav/sidenav';
import { ExposedSecretReportOverview } from './exposed-secret-reports/overview/exposed-secret-report-overview';
import { DetailedExposedSecretReport } from './exposed-secret-reports/detailed/detailed-exposed-secret-report';

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
      { path: 'exposed-secret-reports-overview', component: ExposedSecretReportOverview },
      { path: 'detailed-exposed-secret', component: DetailedExposedSecretReport },
    ],
  },
];
