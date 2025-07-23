import { AfterContentInit, AfterViewInit, Component, computed, inject, input, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http-service';
import { VulnerabilityReport } from '../../dto/main';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-detailed-report',
  imports: [MatCardModule],
  templateUrl: './detailed-report.html',
  styleUrl: './detailed-report.scss'
})
export class DetailedReport implements OnInit {

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly httpService = inject(HttpService);
  private uid  = ''
  protected vulnReport!: VulnerabilityReport;

  ngOnInit() {
    this.uid = this.route.snapshot.params['uid']
    this.httpService.getDetailedVulnerabilityReport(this.uid).subscribe( _report => {
      console.log(_report);
      this.vulnReport = _report;
    })
  }
}
