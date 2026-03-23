import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Config } from '../../config/config';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly httpClient = inject(HttpClient);

  private backendUrl = '';

  constructor() {
    let url = '';

    if (environment.production) {
      url = '/assets/config.json'
    } else {
      url = '/assets/config.dev.json'
    }
    
    this.httpClient.get<Config>(url).subscribe((config) => {
      this.backendUrl = config.backendUrl;
    });
  }

  public getBackendUrl() {
    return this.backendUrl;
  }
}
