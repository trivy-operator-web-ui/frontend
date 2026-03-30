import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { VulnerabilityReport } from '../../dto/vulnreport';
import { Artifact } from '../../dto/artifact';
import { Observable } from 'rxjs';
import { SimpleSbomReport } from '../../dto/simplesbomreport';
import { SimpleVulnerabilityReport } from '../../dto/simplevunerabilityreport';
import { Credentials } from '../../dto/credentials';
import { ConfigService } from './config-service';
import { SimpleExposedSecretReport } from '../../dto/simpleexposedsecretreport';
import { ImageExposedSecretReportDTO } from '../../dto/exposedsecretreport';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly httpClient = inject(HttpClient);
  private readonly configService = inject(ConfigService);
  private readonly backendUrl = this.configService.getBackendUrl();

  public login(credentials: Credentials): Observable<any> {
    return this.httpClient.post(`${this.backendUrl}/api/login`, credentials);
  }

  public getVulnerabilityReports(): Observable<SimpleVulnerabilityReport[]> {
    return this.httpClient.get<SimpleVulnerabilityReport[]>(
      `${this.backendUrl}/api/vulnerability-reports/simple`,
    );
  }

  public getDetailedVulnerabilityReport(
    artifact: Artifact,
  ): Observable<VulnerabilityReport> {
    return this.httpClient.post<VulnerabilityReport>(
      `${this.backendUrl}/api/vulnerability-reports/detailed`,
      artifact,
    );
  }

  public getSbomReports(): Observable<SimpleSbomReport[]> {
    return this.httpClient.get<SimpleSbomReport[]>(
      `${this.backendUrl}/api/sbom-reports/simple`,
    );
  }
  public downloadSboms(artifacts: Artifact[]): Observable<HttpResponse<Blob>> {
    return this.httpClient.post(
      `${this.backendUrl}/api/sbom-reports/download`,
      artifacts,
      { responseType: 'blob', observe: 'response' },
    );
  }

    public getExposedSecretReports(): Observable<SimpleExposedSecretReport[]> {
    return this.httpClient.get<SimpleExposedSecretReport[]>(
      `${this.backendUrl}/api/exposed-secret-reports/simple`,
    );
  }

  public getDetailedExposedSecretReport(
    artifact: Artifact,
  ): Observable<ImageExposedSecretReportDTO> {
    return this.httpClient.post<ImageExposedSecretReportDTO>(
      `${this.backendUrl}/api/exposed-secret-reports/detailed`,
      artifact,
    );
  }
}
