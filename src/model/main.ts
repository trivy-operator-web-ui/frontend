// Simply because working with MatSort + nested attributes is a mess
// https://stackoverflow.com/questions/48891174/angular-material-2-datatable-sorting-with-nested-objects/49057493#49057493
export interface SimpleVulnerabilityReportModel {
    // Metadata
    name: string,
    uid: String,
    // Summary
    criticalCount: number,
    highCount: number,
    mediumCount: number,
    lowCount: number,
    noneCount?: number,
    unknownCount: number,
    // Artifact
    digest?: string,
    mimeType?: string,
    repository?: string,
    tag?: string,
}