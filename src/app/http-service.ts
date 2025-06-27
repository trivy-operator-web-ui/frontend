import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { VulnerabilityReport } from '../dto/main';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly client = inject(HttpClient);

  getVulnerabilityReports() {
    this.client.get<VulnerabilityReport[]>
  }
}
