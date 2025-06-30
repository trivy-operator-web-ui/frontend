import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Config } from '../dto/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private backendUrl = '';

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<Config>('/assets/config.json').subscribe(config => {
      this.backendUrl = config.backendUrl
    })
  }

  public getBackendUrl() {
    return this.backendUrl;
  }
}