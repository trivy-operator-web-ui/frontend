import { Component, computed, inject, input, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-detailed-report',
  imports: [],
  templateUrl: './detailed-report.html',
  styleUrl: './detailed-report.scss'
})
export class DetailedReport implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  uid = ''

  ngOnInit(): void {
    this.uid = this.route.snapshot.params['uid']
  }
}
