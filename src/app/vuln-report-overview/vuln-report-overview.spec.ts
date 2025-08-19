import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VulnerabilityReportOverview } from './vuln-report-overview';

describe('Overview', () => {
  let component: VulnerabilityReportOverview;
  let fixture: ComponentFixture<VulnerabilityReportOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VulnerabilityReportOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VulnerabilityReportOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
