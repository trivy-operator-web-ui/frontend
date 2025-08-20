import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbomReportOverview } from './sbom-report-overview';

describe('SbomOverview', () => {
  let component: SbomReportOverview;
  let fixture: ComponentFixture<SbomReportOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SbomReportOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SbomReportOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
