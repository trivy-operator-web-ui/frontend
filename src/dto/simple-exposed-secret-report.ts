import { Artifact } from "./common/artifact";
import { ExposedSecretSummary } from "./exposed-secret-report";

export interface SimpleImageExposedSecretReportDTO {
    artifact: Artifact,
    ownersCount: number,
    summary: ExposedSecretSummary,
    namespaces: string[],
}