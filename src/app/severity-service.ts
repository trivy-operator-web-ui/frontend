import { Injectable } from '@angular/core';
import { Severity } from '../dto/vulnreport';

@Injectable({
  providedIn: 'root'
})
export class SeverityService {
 
  private severityToScore = ['UNKNOWN', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  public toString(severity: Severity): string {
    return this.severityToScore[severity];
  }
}
