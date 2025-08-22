import { Artifact } from './artifact';
import { SbomSummary } from './sbomreport';

export interface SimpleSbomReport {
  artifact: Artifact;
  namespaces: string[];
  ownersCount: number;
  summary: SbomSummary;
}
