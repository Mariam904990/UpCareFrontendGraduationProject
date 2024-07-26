import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckupComponent } from './checkup.component';

describe('CheckupComponent', () => {
  let component: CheckupComponent;
  let fixture: ComponentFixture<CheckupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckupComponent]
    });
    fixture = TestBed.createComponent(CheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
