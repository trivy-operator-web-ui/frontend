export interface VulnerabilityReport {
    metadata: Metadata,
    report: VulnerabilityReportSpec
}

export interface Metadata {
    name: string,
    namespace: string,
    uid: string,
}

export enum Severity {
    Critical = "CRITICAL",
    High = "HIGH",
    Medium = "MEDIUM",
    Low = "LOW",
    Unknown = "UNKNOWN",
}

export interface Cvss {
    V2Score?: number,
    V2Vector?: string,
    V3Score?: number,
    V3Vector?: string,
    V40Score?: number,
    V40Vector?: string,
}

export interface VulnerabilityReportSpec {
    artifact: Artifact,
    os: OperatingSystem,
    registry?: Registry,
    scanner: Scanner,
    summary: Summary,
    updateTimestamp: string,
    vulnerabilities: Vulnerabilities[],
}

export interface Artifact {
    digest?: string,
    mimeType?: string,
    repository?: string,
    tag?: string,
}

export interface OperatingSystem {
    eosl: boolean,
    family?: string,
    name?: string
}

export interface Registry {
    server?: string
}

export interface Scanner {
    name: string,
    vendor: string,
    version: string,
}

export interface Summary {
    criticalCount: number,
    highCount: number,
    mediumCount: number,
    lowCount: number,
    noneCount?: number,
    unknownCount: number,
}

export interface Vulnerabilities {
    class?: string,
    cvss?: Map<string, Cvss>,
    cvsssource?: string,
    description?: string,
    fixedVersion: string
    installedVersion: string,
    lastModifiedDate: string,
    links?: string[],
    packagePath?: string,
    packageType?: string,
    primaryLink?: string,
    publishedDate: string,
    resource: string,
    score?: number,
    severity: Severity,
    target?: string,
    title: string,
    vulnerabilityID: string,
}