import { Component, inject, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from '../http-service';
import { SimpleSbomReport } from '../../dto/simplesbomreport';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { SimpleSbomReportModel } from '../../model/simplesbomreport';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@Component({
  standalone: true,
  selector: 'app-sbom-overview',
  imports: [MatListModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    RouterLink,
    MatProgressSpinnerModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule
  ],
  templateUrl: './sbom-report-overview.html',
  styleUrl: './sbom-report-overview.scss'
})
export class SbomReportOverview implements OnInit, AfterViewInit {
  private readonly httpService = inject(HttpService);

  protected sbomsReports: SimpleSbomReportModel[] = [];
  protected dataSource = new MatTableDataSource<SimpleSbomReportModel>();
  protected displayedColumns: string[] = ['image', 'componentsCount', 'dependenciesCount'];
  protected namespaces = new Set<string>();
  public reportsLoading = true;

  public imageFilter = '';
  public namespace = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.httpService.getSbomReports().pipe(
      map(_reports => {
        return _reports.map(r => {
          this.namespaces.add(r.namespace);
          return this.mapDtoToModel(r);
        })
      }
      )
    ).subscribe(_reports => {
      console.log(_reports)
      this.sbomsReports = _reports;
      this.namespace = localStorage.getItem('sbomNamespace') ?? this.sbomsReports[0].namespace;

      this.dataSource.data = this.sbomsReports.filter(report => report.namespace === this.namespace);

      this.imageFilter = localStorage.getItem('sbomImageFilter') ?? '';
      this.reportsLoading = false;
    })
  }

  private mapDtoToModel(report: SimpleSbomReport): SimpleSbomReportModel {
    return {
      uid: report.uid,
      namespace: report.namespace,
      image: report.image,
      componentsCount: report.summary.componentsCount,
      dependenciesCount: report.summary.dependenciesCount,
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function (data, filter) {
      return data.image.includes(filter)
    }
    this.dataSource.filter = localStorage.getItem('sbomImageFilter') ?? '';

    const sort: Sort = JSON.parse(localStorage.getItem('sbomOverviewSort') || '{}');
    if (sort.direction) this.sort.sort({ id: sort.active, start: sort.direction, disableClear: false });
  }

  protected saveSortDirection(sortState: Sort) {
    localStorage.setItem('sbomOverviewSort', JSON.stringify(sortState));
  }

  protected filterNamespace(event: MatSelectChange<string>) {
    const namespace = event.value;
    this.dataSource.data = this.sbomsReports.filter(report => report.namespace === namespace);
    localStorage.setItem('sbomNamespace', namespace);
  }

  protected filterTable(event: KeyboardEvent) {
    const imageFilter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = imageFilter.trim().toLowerCase();
    localStorage.setItem('sbomImageFilter', imageFilter);
  }
}
