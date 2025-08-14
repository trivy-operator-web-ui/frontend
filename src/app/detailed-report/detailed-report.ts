import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http-service';
import { Vulnerability, VulnerabilityReport } from '../../dto/main';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LowerCasePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SeverityService } from '../severity-service';

@Component({
  standalone: true,
  selector: 'app-detailed-report',
  imports: [MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, LowerCasePipe, MatProgressSpinnerModule],
  templateUrl: './detailed-report.html',
  styleUrl: './detailed-report.scss'
})
export class DetailedReport implements AfterViewInit {
  protected displayedColumns: string[] = ['severity', 'score', 'title', 'vulnerabilityID',  'installedVersion', 'fixedVersion', 'primaryLink'];
  
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly httpService = inject(HttpService);
  protected readonly severityService = inject(SeverityService);

  private readonly uid = this.route.snapshot.params['uid']
  protected vulnReport: VulnerabilityReport | undefined;

  protected dataSource = new MatTableDataSource<Vulnerability>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.httpService.getDetailedVulnerabilityReport(this.uid).subscribe(_report => {
      this.vulnReport = _report
      this.dataSource.data = _report.report.vulnerabilities
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.restoreSortDirection();
  }

  protected saveSortDirection(sortState: Sort) {
    localStorage.setItem('detailedSort', JSON.stringify(sortState));
  }
  
  private restoreSortDirection() {
    const sort: Sort = JSON.parse(localStorage.getItem('detailedSort') || '{}');
    if (sort.direction) this.sort.sort({id: sort.active, start: sort.direction, disableClear: false});
  }
}
