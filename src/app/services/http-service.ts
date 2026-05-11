import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ImageVulnerabilityReportDTO } from '../../dto/vulnerability-report';
import { Artifact } from '../../dto/common/artifact';
import { Observable } from 'rxjs';
import { SimpleImageSbomReportDTO } from '../../dto/simple-sbom-report';
import { SimpleImageVulnerabilityReportDTO } from '../../dto/simple-vunerability-report';
import { Credentials } from '../../dto/credentials';
import { ConfigService } from './config-service';
import { SimpleImageExposedSecretReportDTO } from '../../dto/simple-exposed-secret-report';
import { ImageExposedSecretReportDTO } from '../../dto/exposed-secret-report';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly httpClient = inject(HttpClient);
  private readonly configService = inject(ConfigService);

  public login(credentials: Credentials): Observable<any> {
    const backendUrl = this.configService.getBackendUrl();
    return this.httpClient.post(`${backendUrl}/api/login`, credentials);
  }

  public getVulnerabilityReports(): Observable<SimpleImageVulnerabilityReportDTO[]> {
    const backendUrl = this.configService.getBackendUrl();
    return this.httpClient.get<SimpleImageVulnerabilityReportDTO[]>(
      `${backendUrl}/api/vulnerability-reports/simple`,
    );
  }

  public getDetailedVulnerabilityReport(
    artifact: Artifact,
  ): Observable<ImageVulnerabilityReportDTO> {
    const backendUrl = this.configService.getBackendUrl();
    return this.httpClient.post<ImageVulnerabilityReportDTO>(
      `${backendUrl}/api/vulnerability-reports/detailed`,
      artifact,
    );
  }

  public getSbomReports(): Observable<SimpleImageSbomReportDTO[]> {
    const backendUrl = this.configService.getBackendUrl();
    return this.httpClient.get<SimpleImageSbomReportDTO[]>(
      `${backendUrl}/api/sbom-reports/simple`,
    );
  }
  public downloadSboms(artifacts: Artifact[]): Observable<HttpResponse<Blob>> {
    const backendUrl = this.configService.getBackendUrl();
    return this.httpClient.post(
      `${backendUrl}/api/sbom-reports/download`,
      artifacts,
      { responseType: 'blob', observe: 'response' },
    );
  }

  public getExposedSecretReports(): Observable<SimpleImageExposedSecretReportDTO[]> {
    const backendUrl = this.configService.getBackendUrl();
    return this.httpClient.get<SimpleImageExposedSecretReportDTO[]>(
      `${backendUrl}/api/exposed-secret-reports/simple`,
    );
  }

  public getDetailedExposedSecretReport(
    artifact: Artifact,
  ): Observable<ImageExposedSecretReportDTO> {
    const backendUrl = this.configService.getBackendUrl();
    return this.httpClient.post<ImageExposedSecretReportDTO>(
      `${backendUrl}/api/exposed-secret-reports/detailed`,
      artifact,
    );
  }
}
