import { Artifact } from "./artifact";
import { ExposedSecretSummary } from "./exposedsecretreport";

export interface SimpleExposedSecretReport {
    artifact: Artifact,
    ownersCount: number,
    summary: ExposedSecretSummary,
    namespaces: string[],
}