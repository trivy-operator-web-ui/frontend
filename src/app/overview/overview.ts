import { Component, inject, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from './../http-service';
import { SimpleVulnerabilityReport } from '../../dto/main';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { SimpleVulnerabilityReportModel } from '../../model/main';
import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { map } from 'rxjs';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

@Component({
  standalone: true,
  selector: 'app-overview',
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
  templateUrl: './overview.html',
  styleUrl: './overview.scss'
})

export class Overview implements OnInit, AfterViewInit {
  private readonly httpService = inject(HttpService);

  protected reports: SimpleVulnerabilityReportModel[] = [];
  protected dataSource = new MatTableDataSource<SimpleVulnerabilityReportModel>();
  protected displayedColumns: string[] = ['image', 'criticalCount', 'highCount', 'mediumCount', 'lowCount', 'noneCount', 'unknownCount'];
  protected namespaces = new Set<string>();
  public reportsLoading = true;

  public imageFilter = '';
  public namespace = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.httpService.getVulnerabilityReports().pipe(
      map(_reports => {
          return _reports.map(r => {
            this.namespaces.add(r.namespace);
            return this.mapDtoToModel(r);
          })
        }
      )
    ).subscribe(_reports => {
      this.reports = _reports;
      this.namespace = localStorage.getItem('namespace') ?? this.reports[0].namespace;
      this.dataSource.data = this.reports.filter(report => report.namespace === this.namespace);

      this.imageFilter = localStorage.getItem('imageFilter') ?? '';

      this.reportsLoading = false;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function (data, filter) {
      return data.image.includes(filter)
    }
    this.dataSource.filter = localStorage.getItem('imageFilter') ?? '';

    const sort: Sort = JSON.parse(localStorage.getItem('overviewSort') || '{}');
    if (sort.direction) this.sort.sort({id: sort.active, start: sort.direction, disableClear: false});
  }

  private mapDtoToModel(report: SimpleVulnerabilityReport): SimpleVulnerabilityReportModel {
    return {
      uid: report.uid,
      criticalCount: report.summary.criticalCount,
      highCount: report.summary.highCount,
      mediumCount: report.summary.mediumCount,
      lowCount: report.summary.lowCount,
      noneCount: report.summary.noneCount,
      unknownCount: report.summary.unknownCount,
      namespace: report.namespace,
      image: report.image,
    }
  }

  protected saveSortDirection(sortState: Sort) {
    localStorage.setItem('overviewSort', JSON.stringify(sortState));
  }

  protected filterNamespace(event: MatSelectChange<string>) {
    const namespace = event.value;
    this.dataSource.data = this.reports.filter(report => report.namespace === namespace);
    localStorage.setItem('namespace', namespace);
  }

  protected filterTable(event: KeyboardEvent) {
    const imageFilter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = imageFilter.trim().toLowerCase();
    localStorage.setItem('imageFilter', imageFilter);
  } 
}
