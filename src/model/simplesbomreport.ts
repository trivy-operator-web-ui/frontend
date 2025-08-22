export interface SimpleSbomReportModel {
  namespaces: string[];
  repository: string;
  tag: string;
  digest: string;
  ownersCount: number;
  componentsCount: number;
  dependenciesCount: number;
}
