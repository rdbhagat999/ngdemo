import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  form!: FormGroup;
  isFormSubmitted = false;
  private authService: AuthService = inject(AuthService);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
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
      return;
    }

    // Form field values
    console.log(this.form?.value);

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
