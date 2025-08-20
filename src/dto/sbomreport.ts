import { Scanner } from "typescript";
import { Metadata } from "./metdata";
import { Registry } from "./registry";

export interface SbomReport {
    report: SbomReportSpec,
    metadata: Metadata,
}

export interface SbomReportSpec {
    artifact: SbomArtifact,
    // We don't really care about the data inside the SBOM, we just need to export it
    components: any,
    registry?: Registry,
    scanner: Scanner,
    summary: SbomSummary,
    updateTimestamp: string,
}

export interface SbomArtifact {
    digest?: string,
    mimeType?: string,
    repository?: string,
    tag?: string,
}

export interface SbomSummary {
    componentsCount: number,
    dependenciesCount: number,
}
