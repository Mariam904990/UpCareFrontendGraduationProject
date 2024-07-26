import { Injectable } from '@angular/core';
import { Stripe, loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise = loadStripe('pk_test_51PDClRDr4hz1mUokIPSx8UlEnK6MKXsvFdXjAbhkb6yPAdpbx4gDd6Won2PpuHsvUDI1McZ5gs2yOXSXSfmH2p6o00a1bY0iW2')

  async getStripe(): Promise<Stripe | null> {
    return this.stripePromise;
  }
}
