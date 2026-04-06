import {
  Component,
  inject,
  ViewChild,
  AfterViewInit,
  signal,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ErrorStatus } from '../../shared/error-status/error-status';
import { HttpService } from '../../services/http-service';
import { SimpleImageExposedSecretReportDTO } from '../../../dto/simple-exposed-secret-report';
import { SimpleImageExposedSecretReportModel } from '../../../model/simple-exposed-secret-report';

@Component({
  standalone: true,
  selector: 'app-exposed-secret-report-overview',
  imports: [
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
    AsyncPipe,
    ErrorStatus,
  ],
  templateUrl: './exposed-secret-report-overview.html',
  styleUrl: './exposed-secret-report-overview.scss',
})
export class ExposedSecretReportOverview implements AfterViewInit {
  private readonly localStorageKeys = {
    namespace: 'exposedSecretReportOverviewNamespace',
    imageFilter: 'exposedSecretReportOverviewImageFilter',
    sort: 'exposedSecretReportOverviewSort',
  };

  public errorMessage = signal('');
  public errorCode = signal(-1);

  private readonly httpService = inject(HttpService);
  private readonly router = inject(Router);

  protected reports: SimpleImageExposedSecretReportModel[] = [];

  protected reports$: Observable<SimpleImageExposedSecretReportModel[]> =
    this.httpService.getExposedSecretReports().pipe(
      catchError((err) => {
        this.errorMessage.set(err.message);
        this.errorCode.set(err.status);
        return EMPTY;
      }),
      map((_reports) => _reports.map((r) => this.mapDtoToModel(r))),
      tap((_dtoReports) => {
        this.reports = _dtoReports;
        this.reports
          .flatMap((r) => r.namespaces)
          .forEach((ns) => this.namespaces.add(ns));
        this.namespace =
          localStorage.getItem(this.localStorageKeys.namespace) ??
          this.namespaces.values().next().value!;
        this.dataSource.data = this.reports.filter((report) =>
          report.namespaces.includes(this.namespace),
        );
        this.imageFilter =
          localStorage.getItem(this.localStorageKeys.imageFilter) ?? '';
      }),
    );

  protected dataSource =
    new MatTableDataSource<SimpleImageExposedSecretReportModel>();
  protected displayedColumns: string[] = [
    'repository',
    'tag',
    'digest',
    'namespaceCount',
    'ownersCount',
    'criticalCount',
    'highCount',
    'mediumCount',
    'lowCount',
  ];

  protected namespaces = new Set<string>();

  public imageFilter = '';
  public namespace = '';

  @ViewChild(MatSort)
  set matSort(sort: MatSort) {
    if (sort) {
      const savedSort: Sort = JSON.parse(
        localStorage.getItem(this.localStorageKeys.sort) || '{}',
      );
      if (savedSort.direction)
        sort.sort({
          id: savedSort.active,
          start: savedSort.direction,
          disableClear: false,
        });
      this.dataSource.sort = sort;
    }
  }

  @ViewChild(MatPaginator)
  set matPaginator(paginator: MatPaginator) {
    if (paginator) {
      this.dataSource.paginator = paginator;
    }
  }

  ngAfterViewInit(): void {
    this.restoreImageFilter();
  }

  private mapDtoToModel(
    simpleReport: SimpleImageExposedSecretReportDTO,
  ): SimpleImageExposedSecretReportModel {
    return {
      namespaces: simpleReport.namespaces,
      namespaceCount: simpleReport.namespaces.length,
      criticalCount: simpleReport.summary.criticalCount,
      highCount: simpleReport.summary.highCount,
      mediumCount: simpleReport.summary.mediumCount,
      lowCount: simpleReport.summary.lowCount,
      repository: simpleReport.artifact.repository || '',
      digest: simpleReport.artifact.digest || '',
      tag: simpleReport.artifact.tag || '',
      ownersCount: simpleReport.ownersCount,
    };
  }

  protected restoreImageFilter() {
    this.dataSource.filterPredicate = function (data, filter) {
      return data.repository.includes(filter);
    };
    this.dataSource.filter =
      localStorage.getItem(this.localStorageKeys.imageFilter) ?? '';
  }

  protected saveSortDirection(sortState: Sort) {
    localStorage.setItem(this.localStorageKeys.sort, JSON.stringify(sortState));
  }

  protected filterNamespace(event: MatSelectChange<string>) {
    const namespace = event.value;
    this.dataSource.data = this.reports.filter((report) =>
      report.namespaces.includes(this.namespace),
    );
    localStorage.setItem(this.localStorageKeys.namespace, namespace);
  }

  protected filterTable(event: KeyboardEvent) {
    const imageFilter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = imageFilter.trim().toLowerCase();
    localStorage.setItem(this.localStorageKeys.imageFilter, imageFilter);
  }

  protected navigateToDetailed(
    repository: string,
    tag: string,
    digest: string,
  ) {
    this.router.navigate([`detailed-exposed-secret`], {
      queryParams: {
        repository,
        tag,
        digest,
      },
    });
  }
}
