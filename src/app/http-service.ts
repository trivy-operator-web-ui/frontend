import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SimpleVulnerabilityReport, VulnerabilityReport } from '../dto/main';
import { ConfigService } from './config-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly httpClient = inject(HttpClient);
  private readonly configService = inject(ConfigService);
  private readonly backendUrl = this.configService.getBackendUrl();

  getVulnerabilityReports(): Observable<SimpleVulnerabilityReport[]> {
    return this.httpClient.get<SimpleVulnerabilityReport[]>(`${this.backendUrl}/api/vulnreports`);
  }

  getDetailedVulnerabilityReport(uid: string): Observable<VulnerabilityReport> {
    return this.httpClient.get<VulnerabilityReport>(`${this.backendUrl}/api/vulnreports/${uid}`);
  }
}
