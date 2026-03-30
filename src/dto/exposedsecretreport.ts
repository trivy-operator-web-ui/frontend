import { Artifact } from "./artifact"
import { Registry } from "./registry"
import { Scanner } from "./scanner"
import { Severity } from "./severity"
import { Workload } from "./workload"

export interface ImageExposedSecretReportDTO {
    report: ImageExposedSecretReport,
    owners: Workload[],
}

export interface ImageExposedSecretReport {
    artifact: Artifact,
    registry?: Registry,
    scanner: Scanner,
    secrets: ExposedSecret[],
    summary: ExposedSecretSummary,
    updateTimestamp: String,
}

export interface ExposedSecret {
    category: string,
    match: string,
    ruleID: string,
    severity: Severity,
    target: string,
    title: string,
}

export interface ExposedSecretSummary {
    criticalCount: number,
    highCount: number,
    lowCount: number,
    mediumCount: number,
}