import { Artifact } from './artifact';
import { Summary } from './vulnreport';

export interface SimpleVulnerabilityReport {
  artifact: Artifact;
  owners_count: number;
  summary: Summary;
  namespaces: string[];
}
