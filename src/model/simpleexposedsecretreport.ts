export interface SimpleExposedSecretReportModel {
  // Metadata
  namespaces: string[];
  namespaceCount: number;
  // Summary
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  // Artifact
  repository: string;
  tag: string;
  digest: string;
}