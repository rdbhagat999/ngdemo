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
    // let result = false;

    // this.authService.loggedIn$.subscribe((isLoggedIn) => {
    //   result = isLoggedIn;
    //   if (result == false) {
    //     alert('Not authorized, please login.');
    //   }
    // });

    // return result;

    if (this.authService.checkAuthStatusBoolean()) {
      return true;
    }

    // this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
    this.router.navigate(['/auth']);
    return false;
  }
}
