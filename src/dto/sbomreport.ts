import { Scanner } from 'typescript';
import { Metadata } from './metdata';
import { Registry } from './registry';
import { Artifact } from './artifact';

export interface SbomReport {
  report: SbomReportSpec;
  metadata: Metadata;
}

export interface SbomReportSpec {
  artifact: Artifact;
  // We don't really care about the data inside the SBOM, we just need to export it
  components: unknown;
  registry?: Registry;
  scanner: Scanner;
  summary: SbomSummary;
  updateTimestamp: string;
}

export interface SbomSummary {
  componentsCount: number;
  dependenciesCount: number;
}
