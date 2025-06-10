import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';

// Option 1: Functional Guard (Recommended for new applications)
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | boolean
  | UrlTree
  | Promise<boolean | UrlTree>
  | import('rxjs').Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Allow access if authenticated
  } else {
    // Redirect to login page and prevent access
    return router.createUrlTree(['/auth/login']);
  }
};
