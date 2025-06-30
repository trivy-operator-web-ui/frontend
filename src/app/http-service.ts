import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SimpleVulnerabilityReport } from '../dto/main';
import { ConfigService } from './config-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private backendUrl = '';

  constructor(private httpClient: HttpClient, private configService: ConfigService) {
    this.backendUrl = configService.getBackendUrl();
  }

  getVulnerabilityReports(): Observable<SimpleVulnerabilityReport[]> {
    return this.httpClient.get<SimpleVulnerabilityReport[]>(`${this.backendUrl}/api/vulnreports`);
  }
}
