import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpService } from './http-service';
import { SimpleVulnerabilityReport } from '../dto/main';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {
  protected title = 'trivy-operator-web-ui';

  private readonly httpService = inject(HttpService);

  protected dataSource = new MatTableDataSource<SimpleVulnerabilityReport>();
  protected displayedColumns: string[] = ['name', 'critical', 'high', 'medium', 'low', 'none', 'unknown'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.httpService.getVulnerabilityReports().subscribe( _reports => {
      this.dataSource.data = _reports;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}