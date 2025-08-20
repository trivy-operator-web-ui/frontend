import { Summary } from "./vulnreport";

export interface SimpleVulnerabilityReport {
    uid: string,
    image: string,
    namespace: string,
    summary: Summary,
}