import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorStatus } from './error-status';

describe('ErrorStatus', () => {
  let component: ErrorStatus;
  let fixture: ComponentFixture<ErrorStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorStatus],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
