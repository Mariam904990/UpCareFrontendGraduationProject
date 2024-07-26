import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router)
  let _AuthService = inject(AuthService);

  if (localStorage.getItem('upcare-token') != null) {
    return true;
  }

  _Router.navigate(['/login']);
  return false;
};
