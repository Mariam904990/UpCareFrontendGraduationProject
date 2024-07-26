import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNurseCareComponent } from './add-nurse-care.component';

describe('AddNurseCareComponent', () => {
  let component: AddNurseCareComponent;
  let fixture: ComponentFixture<AddNurseCareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNurseCareComponent]
    });
    fixture = TestBed.createComponent(AddNurseCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
