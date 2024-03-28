import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CanMatchFn, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
  .pipe(
    tap( isAuthenticated => console.log({isAuthenticated}) ),
    tap( isAuthenticated => {
      if ( !isAuthenticated ){
        router.navigate(['/auth/login']);
      }
    } )
  );
}

export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // console.log('CanActivate');
  // console.log({ route, state });

  return checkAuthStatus();
};

export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  // console.log('CanMatch');
  // console.log({ route, segments });

  return checkAuthStatus();
};
