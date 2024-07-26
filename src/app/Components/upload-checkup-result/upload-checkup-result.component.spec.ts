import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCheckupResultComponent } from './upload-checkup-result.component';

describe('UploadCheckupResultComponent', () => {
  let component: UploadCheckupResultComponent;
  let fixture: ComponentFixture<UploadCheckupResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadCheckupResultComponent]
    });
    fixture = TestBed.createComponent(UploadCheckupResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
