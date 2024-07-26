import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCheckupComponent } from './add-checkup.component';

describe('AddCheckupComponent', () => {
  let component: AddCheckupComponent;
  let fixture: ComponentFixture<AddCheckupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCheckupComponent]
    });
    fixture = TestBed.createComponent(AddCheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
