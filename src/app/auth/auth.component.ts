import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  form!: FormGroup;
  isFormSubmitted = false;
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

    this.authService.loginToDummyJson(
      this.form.value?.username,
      this.form.value?.password
    );
  }

  canDeactivate() {
    const pristine = this.form.pristine;
    console.log('pristine', pristine);
    return pristine;
  }
}
