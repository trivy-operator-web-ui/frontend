import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { VulnerabilityReport } from '../dto/vulnreport';

import { ConfigService } from './config-service';
import { Observable } from 'rxjs';
import { SimpleSbomReport } from '../dto/simplesbomreport';
import { SbomReport } from '../dto/sbomreport';
import { SimpleVulnerabilityReport } from '../dto/simplevunerabilityreport';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly httpClient = inject(HttpClient);
  private readonly configService = inject(ConfigService);
  private readonly backendUrl = this.configService.getBackendUrl();

  public getVulnerabilityReports(): Observable<SimpleVulnerabilityReport[]> {
    return this.httpClient.get<SimpleVulnerabilityReport[]>(`${this.backendUrl}/api/vulnreports`);
  }

  public getDetailedVulnerabilityReport(uid: string): Observable<VulnerabilityReport> {
    return this.httpClient.get<VulnerabilityReport>(`${this.backendUrl}/api/vulnreports/${uid}`);
  }

  public getSbomReports(): Observable<SimpleSbomReport[]> {
    return this.httpClient.get<SimpleSbomReport[]>(`${this.backendUrl}/api/sboms`);
  }

  public getDetailedSbomReport(uid: string): Observable<SbomReport> {
    return this.httpClient.get<SbomReport>(`${this.backendUrl}/api/sboms/${uid}`);
  }
}
