import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '@app/_services/auth.service';
import { IDummyJsonUser } from '@app/_models/dummy-json-user.interface';
import { ROLE } from '@app/_models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnDestroy {
  form!: FormGroup;
  loginRoleForm!: FormGroup;
  isFormSubmitted = false;
  sub1$!: Subscription;
  sub2$!: Subscription;
  sub3$!: Subscription;
  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  constructor() {}

  initLoginRoleForm() {
    this.loginRoleForm = this.fb.group({
      loginRole: new FormControl('USER'),
    });

    this.sub3$ = this.loginRoleForm.valueChanges.subscribe(({ loginRole }) => {
      switch (loginRole) {
        case ROLE.ADMIN:
          this.form.patchValue({
            username: 'kminchelle',
            password: '0lelplR',
          });
          break;
        case ROLE.AUTHOR:
          this.form.patchValue({
            username: 'hbingley1',
            password: 'CQutx25i8r',
          });
          break;
        default:
          this.form.patchValue({
            username: 'atuny0',
            password: '9uQFF1Lh',
          });
          break;
      }
    });
  }

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
      username: ['atuny0', [Validators.required]],
      password: ['9uQFF1Lh', [Validators.required]],
    });

    this.initLoginRoleForm();
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
        next: async (data: any) => {
          await this.authService.onLoginUpdateDummyJsonUserState(
            data as IDummyJsonUser
          );

          this.router.navigateByUrl('/image-cropper');
        },
        error: (err) => {
          this.isFormSubmitted = false;
          throw new Error(err?.error?.message);
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
    if (this.sub3$) {
      this.sub3$.unsubscribe();
    }
  }
}
