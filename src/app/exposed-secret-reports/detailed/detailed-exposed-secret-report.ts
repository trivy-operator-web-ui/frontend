import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { HttpService } from '../../services/http-service';
import { catchError, Observable } from 'rxjs';
import { Artifact } from '../../../dto/artifact';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { ImageExposedSecretReportDTO } from '../../../dto/exposedsecretreport';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';
import { OwnersTable } from '../../shared/owners-table/owners-table';
import { ErrorStatus } from '../../shared/error-status/error-status';
import { ExposedSecretTable } from './table/exposed-secret-table';

type TableType = 'exposedSecrets' | 'owners';


@Component({
  selector: 'app-detailed-exposed-secret-report',
    imports: [
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    AsyncPipe,
    ExposedSecretTable,
    OwnersTable,
    ErrorStatus,
  ],
  templateUrl: './detailed-exposed-secret-report.html',
  styleUrl: './detailed-exposed-secret-report.scss'
})
export class DetailedExposedSecretReport implements OnInit {
  @Input() repository!: string;
  @Input() tag!: string;
  @Input() digest!: string;

  protected shownTable: TableType = 'exposedSecrets';
  protected errorMessage = signal('');
  protected errorCode = signal(-2);

  private readonly httpService = inject(HttpService);

  protected exposedSecretReport$: Observable<ImageExposedSecretReportDTO> | undefined;

  ngOnInit(): void {
    const artifact: Artifact = {
      repository: this.repository,
      tag: this.tag,
      digest: this.digest,
    };

    this.exposedSecretReport$ = this.httpService
      .getDetailedExposedSecretReport(artifact)
      .pipe(
        catchError((err) => {
          this.errorMessage.set(err.message);
          this.errorCode.set(err.status);
          console.log(this.errorCode());
          throw err;
        }),
      );
  }

  changeTable(event: MatButtonToggleChange) {
    this.shownTable = event.value as TableType;
  }
}
