import { Injectable } from '@angular/core';
import { Severity } from '../../dto/vulnreport';

@Injectable({
  providedIn: 'root',
})
export class SeverityService {
  private severityToScore = {
    UNKNOWN: 0,
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    CRITICAL: 4,
  };

  public toNumber(severity: Severity): number {
    return this.severityToScore[severity];
  }
}
