import { SbomSummary } from "../dto/sbom";

export interface SimpleSbomReport {
    uid: string,
    image: string,
    namespace: string,
    summary: SbomSummary,
}