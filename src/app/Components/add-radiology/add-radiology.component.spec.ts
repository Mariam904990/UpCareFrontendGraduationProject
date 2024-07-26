import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRadiologyComponent } from './add-radiology.component';

describe('AddRadiologyComponent', () => {
  let component: AddRadiologyComponent;
  let fixture: ComponentFixture<AddRadiologyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRadiologyComponent]
    });
    fixture = TestBed.createComponent(AddRadiologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
