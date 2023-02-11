import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthComponent } from './auth/auth.component';

@Injectable({
  providedIn: 'root',
})
export class DeactivateGuard implements CanDeactivate<AuthComponent> {
  canDeactivate(
    component: AuthComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.canDeactivate() || confirm('Are you sure?');
  }
}
