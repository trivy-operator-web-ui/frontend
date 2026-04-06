export interface SimpleImageExposedSecretReportModel {
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
  // Owners
  ownersCount: number;
}