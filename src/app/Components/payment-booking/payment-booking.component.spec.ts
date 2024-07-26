import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBookingComponent } from './payment-booking.component';

describe('PaymentBookingComponent', () => {
  let component: PaymentBookingComponent;
  let fixture: ComponentFixture<PaymentBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentBookingComponent]
    });
    fixture = TestBed.createComponent(PaymentBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
