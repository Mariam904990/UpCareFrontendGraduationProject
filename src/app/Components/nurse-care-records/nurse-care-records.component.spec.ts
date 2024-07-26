import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseCareRecordsComponent } from './nurse-care-records.component';

describe('NurseCareRecordsComponent', () => {
  let component: NurseCareRecordsComponent;
  let fixture: ComponentFixture<NurseCareRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NurseCareRecordsComponent]
    });
    fixture = TestBed.createComponent(NurseCareRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
