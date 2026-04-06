import { Scanner } from 'typescript';
import { Metadata } from './common/metdata';
import { Registry } from './common/registry';
import { Artifact } from './common/artifact';

export interface ImageSbomReportDTO {
  report: ImageSbomReport;
  metadata: Metadata;
}

export interface ImageSbomReport {
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
