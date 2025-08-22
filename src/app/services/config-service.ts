import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Config } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly httpClient = inject(HttpClient);

  private backendUrl = '';

  constructor() {
    this.httpClient.get<Config>('/assets/config.json').subscribe((config) => {
      this.backendUrl = config.backendUrl;
    });
  }

  public getBackendUrl() {
    return this.backendUrl;
  }
}
