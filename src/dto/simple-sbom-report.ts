import { Artifact } from './common/artifact';
import { SbomSummary } from './sbom-report';

export interface SimpleImageSbomReportDTO {
  artifact: Artifact;
  namespaces: string[];
  ownersCount: number;
  summary: SbomSummary;
}
