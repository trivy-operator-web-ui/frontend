import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbomDownloadPopup } from './sbom-download-popup';

describe('SbomDownloadPopup', () => {
  let component: SbomDownloadPopup;
  let fixture: ComponentFixture<SbomDownloadPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SbomDownloadPopup],
    }).compileComponents();

    fixture = TestBed.createComponent(SbomDownloadPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
