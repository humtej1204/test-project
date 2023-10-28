import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token/token.service';

export const isLoggedGuard = () => {
  const tokenServ = inject(TokenService);
  const router = inject(Router);

  if (tokenServ.getToken()) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
