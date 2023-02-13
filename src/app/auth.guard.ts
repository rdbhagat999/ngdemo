import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!!this.authService.AuthUserStatus) {
      return true;
    }

    alert('Not authorized, please login.');
    // this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
    this.router.navigate(['/auth']);
    return false;
  }
}
