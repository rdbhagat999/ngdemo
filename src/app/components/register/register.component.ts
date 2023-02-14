import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CheckUsernameExistsAsyncValidator } from 'src/app/validators/check-username-exists-async-validator';
import { passwordMatchValidator } from 'src/app/validators/password-match-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class RegisterComponent implements OnDestroy {
  form!: FormGroup;
  isFormSubmitted = false;
  sub$!: Subscription;
  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private checkUsernameExistsAsyncValidator = inject(
    CheckUsernameExistsAsyncValidator
  );
  private router: Router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.initForm();
    if (!!this.authService.AuthUserStatus) {
      this.router.navigate(['/home']);
    }
  }

  initForm() {
    this.form = this.fb.group(
      {
        username: [
          'kminchelle',
          [Validators.required],
          [
            this.checkUsernameExistsAsyncValidator.validate.bind(
              this.checkUsernameExistsAsyncValidator
            ),
          ],
        ],

        password: ['0lelplR', [Validators.required]],
        confirmPassword: ['0lelplR', [Validators.required]],
      },
      {
        updateOn: 'blur',
        validators: passwordMatchValidator,
      }
    );
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
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
    console.log(this.form?.value);
  }

  canDeactivate() {
    const pristine = this.form.pristine;
    console.log('pristine', pristine);
    return pristine;
  }

  // Only Integer Numbers
  keyPressNumbers(event: {
    which: any;
    keyCode: any;
    preventDefault: () => void;
  }) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  // Only Numbers with Decimals
  keyPressNumbersDecimal(event: {
    which: any;
    keyCode: any;
    preventDefault: () => void;
  }) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  // Only AlphaNumeric
  keyPressAlphaNumeric(event: { keyCode: number; preventDefault: () => void }) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  // Only AlphaNumeric with Some Characters [-_ ]
  keyPressAlphaNumericWithCharacters(event: {
    keyCode: number;
    preventDefault: () => void;
  }) {
    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/[a-zA-Z0-9-_ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
