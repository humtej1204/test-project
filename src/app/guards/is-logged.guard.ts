import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token/token.service';
import { take, tap } from 'rxjs';

export const isLoggedGuard = () => {
  const tokenServ = inject(TokenService);
  const router = inject(Router);

  return tokenServ.isLogged$
  .pipe(
    take(1),
    tap((isLoggedIn) => isLoggedIn ? router.navigate(['/dashboard']): true)
  )
};
