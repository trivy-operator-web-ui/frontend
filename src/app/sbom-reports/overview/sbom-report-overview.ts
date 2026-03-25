import {
  Component,
  inject,
  ViewChild,
  AfterViewInit,
  signal,
} from '@angular/core';
import { HttpService } from '../../services/http-service';
import { SimpleSbomReport } from '../../../dto/simplesbomreport';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { SimpleSbomReportModel } from '../../../model/simplesbomreport';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SbomDownloadPopup } from '../download-popup/sbom-download-popup';
import { Artifact } from '../../../dto/artifact';
import { ErrorStatus } from '../../shared/error-status/error-status';
@Component({
  standalone: true,
  selector: 'app-sbom-overview',
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
    MatCheckboxModule,
    MatButtonModule,
    ErrorStatus,
  ],
  templateUrl: './sbom-report-overview.html',
  styleUrl: './sbom-report-overview.scss',
})
export class SbomReportOverview implements AfterViewInit {
  private readonly httpService = inject(HttpService);
  private readonly dialog = inject(MatDialog);

  private readonly localStorageKeys = {
    namespace: 'sbomReportOverviewNamespace',
    imageFilter: 'sbomReportOverviewImageFilter',
    sort: 'sbomReportOverviewSort',
  };

  public selection = new SelectionModel<SimpleSbomReportModel>(true, []);

  protected reports: SimpleSbomReportModel[] = [];
  protected dataSource = new MatTableDataSource<SimpleSbomReportModel>();
  protected displayedColumns: string[] = [
    'select',
    'repository',
    'tag',
    'digest',
    'ownersCount',
    'componentsCount',
    'dependenciesCount',
  ];
  protected namespaces = new Set<string>();
  public reportsLoading = true;

  public imageFilter = '';
  public namespace = '';

  public selectErrorMessage = '';
  public httpErrorMessage = signal('');
  public httpErrorCode = signal(-1);

  protected reports$: Observable<SimpleSbomReportModel[]> = this.httpService
    .getSbomReports()
    .pipe(
      catchError((err) => {
        this.httpErrorMessage.set(err.message);
        this.httpErrorCode.set(err.status);
        return EMPTY;
      }),
      map((_reports) => {
        return _reports.map((r) => {
          return this.mapDtoToModel(r);
        });
      }),
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

  private mapDtoToModel(report: SimpleSbomReport): SimpleSbomReportModel {
    return {
      namespaces: report.namespaces,
      repository: report.artifact.repository || '',
      digest: report.artifact.digest || '',
      tag: report.artifact.tag || '',
      ownersCount: report.ownersCount,
      componentsCount: report.summary.componentsCount,
      dependenciesCount: report.summary.dependenciesCount,
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.filterPredicate = function (data, filter) {
      return data.repository.includes(filter);
    };
    this.dataSource.filter =
      localStorage.getItem(this.localStorageKeys.imageFilter) ?? '';
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
      report.namespaces.includes(namespace),
    );
    localStorage.setItem(this.localStorageKeys.namespace, namespace);
  }

  protected filterTable(event: KeyboardEvent) {
    const imageFilter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = imageFilter.trim().toLowerCase();
    localStorage.setItem(this.localStorageKeys.imageFilter, imageFilter);
  }

  protected isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  protected toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  protected openDownloadPopup() {
    if (this.selection.selected.length === 0) {
      this.selectErrorMessage =
        'You need to select at least 1 SBOM to download';
    } else {
      this.selectErrorMessage = '';
      const artifacts: Artifact[] = this.selection.selected.map(
        (sbom): Artifact => ({
          repository: sbom.repository,
          tag: sbom.tag,
          digest: sbom.digest,
        }),
      );
      this.dialog.open(SbomDownloadPopup, {
        data: artifacts,
        height: '400px',
        width: '600px'
      });
    }
  }
}
