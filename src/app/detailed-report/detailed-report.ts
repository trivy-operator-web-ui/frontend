import { AfterContentInit, AfterViewInit, Component, computed, inject, input, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http-service';
import { VulnerabilityReport } from '../../dto/main';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-detailed-report',
  imports: [MatCardModule, AsyncPipe],
  templateUrl: './detailed-report.html',
  styleUrl: './detailed-report.scss'
})
export class DetailedReport {

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly httpService = inject(HttpService);

  private readonly uid = this.route.snapshot.params['uid']
  protected vulnReport: Observable<VulnerabilityReport>;

  constructor() {
    this.vulnReport = this.httpService.getDetailedVulnerabilityReport(this.uid);
  }
}
