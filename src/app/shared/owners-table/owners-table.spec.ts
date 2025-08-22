import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersTable } from './owners-table';

describe('OwnersTable', () => {
  let component: OwnersTable;
  let fixture: ComponentFixture<OwnersTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnersTable],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnersTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
