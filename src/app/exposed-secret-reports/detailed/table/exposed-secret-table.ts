import { AfterViewInit, Component, inject, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { SeverityService } from '../../../services/severity-service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ExposedSecret } from '../../../../dto/exposedsecretreport';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LowerCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-exposed-secret-table',
    imports: [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LowerCasePipe,
  ],
  templateUrl: './exposed-secret-table.html',
  styleUrl: './exposed-secret-table.scss'
})
export class ExposedSecretTable implements AfterViewInit, OnChanges {
  protected readonly severityService = inject(SeverityService);

  public dataSource = new MatTableDataSource<ExposedSecret>();
  protected displayedColumns: string[] = [
    'severity',
    'title',
    'category',
    'match',
    'target',
    'ruleID',
  ];

  @Input() exposedSecrets: ExposedSecret[] | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'severity':
          return this.severityService.toNumber(item.severity);
        default:
          return (item as any)[property];
      }
    };
    this.restoreSortDirection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = changes['exposedSecrets'].currentValue;
  }

  protected saveSortDirection(sortState: Sort) {
    localStorage.setItem('detailedSort', JSON.stringify(sortState));
  }

  private restoreSortDirection() {
    const sort: Sort = JSON.parse(localStorage.getItem('detailedSort') || '{}');
    if (sort.direction)
      this.sort.sort({
        id: sort.active,
        start: sort.direction,
        disableClear: false,
      });
  }
}
