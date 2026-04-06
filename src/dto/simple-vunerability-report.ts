import { Artifact } from './common/artifact';
import { Summary } from './vulnerability-report';

export interface SimpleImageVulnerabilityReportDTO {
  artifact: Artifact;
  ownersCount: number;
  summary: Summary;
  namespaces: string[];
}
