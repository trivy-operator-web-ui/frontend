import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpService } from './http-service';
import { SimpleVulnerabilityReport } from '../dto/main';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SimpleVulnerabilityReportModel } from '../model/main';

@Component({
  selector: 'app-root',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {
  protected title = 'trivy-operator-web-ui';

  private readonly httpService = inject(HttpService);

  protected dataSource = new MatTableDataSource<SimpleVulnerabilityReportModel>();
  protected displayedColumns: string[] = ['name', 'criticalCount', 'highCount', 'mediumCount', 'lowCount', 'noneCount', 'unknownCount'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.httpService.getVulnerabilityReports().subscribe( _reports => {
      let modelReports: SimpleVulnerabilityReportModel[] = [];

      for (const report of _reports) {
        modelReports.push(this.mapDtoToModel(report));
      }

      this.dataSource.data = modelReports;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private mapDtoToModel(report: SimpleVulnerabilityReport): SimpleVulnerabilityReportModel {
    return {
      name: report.name,
      uid: report.uid,
      criticalCount: report.summary.criticalCount,
      highCount: report.summary.highCount,
      mediumCount: report.summary.mediumCount,
      lowCount: report.summary.lowCount,
      noneCount: report.summary.noneCount,
      unknownCount: report.summary.unknownCount,
      digest: report.artifact.digest,
      mimeType: report.artifact.mimeType,
      repository: report.artifact.repository,
      tag: report.artifact.tag,
    }
  }
}