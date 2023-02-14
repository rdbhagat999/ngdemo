import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { IDummyJsonUser } from '../../dummy-json-user.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnDestroy {
  form!: FormGroup;
  isFormSubmitted = false;
  sub$!: Subscription;
  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.initForm();
    if (!!this.authService.AuthUserStatus) {
      this.router.navigate(['/home']);
    }
  }

  initForm() {
    this.form = this.fb.group({
      username: ['kminchelle', [Validators.required]],
      password: ['0lelplR', [Validators.required]],
    });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  handleSubmit() {
    // Set flag to true
    this.isFormSubmitted = true;

    // Return if form is invalid
    if (this.form?.invalid) {
      this.isFormSubmitted = false;
      return;
    }

    // Form field values
    // console.log(this.form?.value);

    this.sub$ = this.authService
      .loginToDummyJson(this.form.value?.username, this.form.value?.password)
      .subscribe({
        next: (data: any) => {
          this.authService.updateDummyJsonAuthState(data as IDummyJsonUser);
          this.router.navigateByUrl('/products');
        },
        error: (err) => {
          this.isFormSubmitted = false;
          console.log(err);
          alert(`Error: ${err?.error?.message}`);
        },
        complete: () => {
          this.isFormSubmitted = false;
        },
      });
  }

  canDeactivate() {
    const pristine = this.form.pristine;
    console.log('pristine', pristine);
    return pristine;
  }

  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
