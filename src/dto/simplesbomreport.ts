import { SbomSummary } from "./sbomreport";

export interface SimpleSbomReport {
    uid: string,
    image: string,
    namespace: string,
    summary: SbomSummary,
}