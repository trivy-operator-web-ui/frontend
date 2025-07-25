import { AfterContentInit, AfterViewInit, Component, computed, inject, input, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http-service';
import { Vulnerability, VulnerabilityReport } from '../../dto/main';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  standalone: true,
  selector: 'app-detailed-report',
  imports: [MatCardModule, MatTableModule, MatPaginatorModule],
  templateUrl: './detailed-report.html',
  styleUrl: './detailed-report.scss'
})
export class DetailedReport implements AfterViewInit {
  protected displayedColumns: string[] = ['severity', 'score', 'title', 'vulnerabilityID',  'installedVersion', 'fixedVersion', 'primaryLink'];
  
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly httpService = inject(HttpService);

  private readonly uid = this.route.snapshot.params['uid']
  protected vulnReport: VulnerabilityReport | undefined;

  protected dataSource = new MatTableDataSource<Vulnerability>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.httpService.getDetailedVulnerabilityReport(this.uid).subscribe(_report => {
      this.vulnReport = _report
      this.dataSource.data = _report.report.vulnerabilities
    })
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

}
