import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedExposedSecretReport } from './detailed-exposed-secret-report';

describe('DetailedExposedSecretReport', () => {
  let component: DetailedExposedSecretReport;
  let fixture: ComponentFixture<DetailedExposedSecretReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedExposedSecretReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedExposedSecretReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
