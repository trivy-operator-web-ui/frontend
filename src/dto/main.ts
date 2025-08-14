export type Severity = 0 | 1 | 2 | 3 | 4;

export interface Metadata {
    name: string,
    namespace: string,
    uid: string,
}

export interface SimpleVulnerabilityReport {
    summary: Summary,
    name: string,
    artifact: Artifact,
    uid: String,
}

export interface VulnerabilityReport {
    metadata: Metadata,
    report: VulnerabilityReportSpec
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
    scanner: Scanner
    summary: Summary,
    updateTimestamp: string,
    vulnerabilities: Vulnerability[],
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

export interface Vulnerability {
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