import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Workload } from '../../../dto/workload';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SeverityService } from '../../services/severity-service';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-owners-table',
  imports: [MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './owners-table.html',
  styleUrl: './owners-table.scss',
})
export class OwnersTable implements AfterViewInit, OnChanges {
  protected readonly severityService = inject(SeverityService);

  public dataSource = new MatTableDataSource<Workload>();
  protected displayedColumns: string[] = ['kind', 'namespace', 'name'];

  @Input() owners: Workload[] | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.restoreSortDirection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = changes['owners'].currentValue;
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
