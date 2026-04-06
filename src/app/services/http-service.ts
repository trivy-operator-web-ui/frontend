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
  private readonly backendUrl = this.configService.getBackendUrl();

  public login(credentials: Credentials): Observable<any> {
    return this.httpClient.post(`${this.backendUrl}/api/login`, credentials);
  }

  public getVulnerabilityReports(): Observable<SimpleImageVulnerabilityReportDTO[]> {
    return this.httpClient.get<SimpleImageVulnerabilityReportDTO[]>(
      `${this.backendUrl}/api/vulnerability-reports/simple`,
    );
  }

  public getDetailedVulnerabilityReport(
    artifact: Artifact,
  ): Observable<ImageVulnerabilityReportDTO> {
    return this.httpClient.post<ImageVulnerabilityReportDTO>(
      `${this.backendUrl}/api/vulnerability-reports/detailed`,
      artifact,
    );
  }

  public getSbomReports(): Observable<SimpleImageSbomReportDTO[]> {
    return this.httpClient.get<SimpleImageSbomReportDTO[]>(
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

    public getExposedSecretReports(): Observable<SimpleImageExposedSecretReportDTO[]> {
    return this.httpClient.get<SimpleImageExposedSecretReportDTO[]>(
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
