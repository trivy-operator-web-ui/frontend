import { Artifact } from './artifact';
import { Registry } from './registry';
import { Scanner } from './scanner';
import { Workload } from './workload';

export type Severity = 'UNKNOWN' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface VulnerabilityReport {
  owners: Workload[];
  report: VulnerabilityReportSpec;
}

export interface Cvss {
  V2Score?: number;
  V2Vector?: string;
  V3Score?: number;
  V3Vector?: string;
  V40Score?: number;
  V40Vector?: string;
}

export interface VulnerabilityReportSpec {
  artifact: Artifact;
  os: OperatingSystem;
  registry?: Registry;
  scanner: Scanner;
  summary: Summary;
  updateTimestamp: string;
  vulnerabilities: Vulnerability[];
}

export interface OperatingSystem {
  eosl: boolean;
  family?: string;
  name?: string;
}

export interface Summary {
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  noneCount?: number;
  unknownCount: number;
}

export interface Vulnerability {
  class?: string;
  cvss?: Map<string, Cvss>;
  cvsssource?: string;
  description?: string;
  fixedVersion: string;
  installedVersion: string;
  lastModifiedDate: string;
  links?: string[];
  packagePath?: string;
  packageType?: string;
  primaryLink?: string;
  publishedDate: string;
  resource: string;
  score?: number;
  severity: Severity;
  target?: string;
  title: string;
  vulnerabilityID: string;
}
