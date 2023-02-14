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
  sub1$!: Subscription;
  sub2$!: Subscription;
  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.initForm();

    this.sub2$ = this.authService.user$.subscribe((user) => {
      if (user?.id) {
        this.router.navigate(['/home']);
      }
    });
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

    this.sub1$ = this.authService
      .loginToDummyJson(this.form.value?.username, this.form.value?.password)
      .subscribe({
        next: (data: any) => {
          this.authService.onLoginUpdateDummyJsonUserState(
            data as IDummyJsonUser
          );

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
    return pristine;
  }

  ngOnDestroy() {
    if (this.sub1$) {
      this.sub1$.unsubscribe();
    }
    if (this.sub2$) {
      this.sub2$.unsubscribe();
    }
  }
}
