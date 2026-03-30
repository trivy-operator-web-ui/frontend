import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposedSecretTable } from './exposed-secret-table';

describe('ExposedSecretTable', () => {
  let component: ExposedSecretTable;
  let fixture: ComponentFixture<ExposedSecretTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExposedSecretTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExposedSecretTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
