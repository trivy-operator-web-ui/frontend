export interface SimpleSbomReportModel {
    uid: string,
    image: string,
    namespace: string,
    componentsCount: number,
    dependenciesCount: number,
}