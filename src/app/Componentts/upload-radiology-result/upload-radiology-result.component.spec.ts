import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRadiologyResultComponent } from './upload-radiology-result.component';

describe('UploadRadiologyResultComponent', () => {
  let component: UploadRadiologyResultComponent;
  let fixture: ComponentFixture<UploadRadiologyResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadRadiologyResultComponent]
    });
    fixture = TestBed.createComponent(UploadRadiologyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
