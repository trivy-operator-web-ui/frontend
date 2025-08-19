import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedReport } from './detailed-vuln-report';

describe('DetailedReport', () => {
  let component: DetailedReport;
  let fixture: ComponentFixture<DetailedReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
