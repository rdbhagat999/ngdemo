import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of, switchMap, timer } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class CheckUsernameExistsAsyncValidator implements AsyncValidator {
  authService = inject(AuthService);

  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.authService.checkUsername(control.value).pipe(
      map((isTaken) => (isTaken ? { usernameExists: true } : null)),
      catchError(() => of(null))
    );
  }
}
