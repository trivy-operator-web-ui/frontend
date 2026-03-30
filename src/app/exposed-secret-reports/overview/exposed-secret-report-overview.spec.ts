import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExposedSecretReportOverview } from './exposed-secret-report-overview';

describe('Overview', () => {
  let component: ExposedSecretReportOverview;
  let fixture: ComponentFixture<ExposedSecretReportOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExposedSecretReportOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(ExposedSecretReportOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
