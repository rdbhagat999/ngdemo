import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/_services/auth.service';
import { MockAuthService, MockHttpClient, mockUser } from '../../test_utils';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let http: HttpClient;
  let router: Router;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AuthComponent],
      providers: [
        FormBuilder,
        Router,
        { provide: AuthService, useClass: MockAuthService },
        { provide: HttpClient, useClass: MockHttpClient },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);
    service = TestBed.inject(AuthService);
  });

  it('should create', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render input elements', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const usernameInput = compiled.querySelector('input[id="username"]');
    const passwordInput = compiled.querySelector('input[id="password"]');

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should test input validity', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const usernameInput = component.form.controls['username'];
    const passwordInput = component.form.controls['password'];

    expect(usernameInput.valid).withContext('first valid').toBeTruthy();
    expect(passwordInput.valid).withContext('first valid').toBeTruthy();

    usernameInput.setValue('');
    passwordInput.setValue('');

    expect(usernameInput.valid).withContext('later invalid').toBeFalsy();
    expect(passwordInput.valid).withContext('later invalid').toBeFalsy();
  });

  it('should test input errors', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const usernameInput = component.form.controls['username'];
    expect(usernameInput.errors).withContext('first valid').toBeNull();

    usernameInput.setValue('');
    expect(usernameInput.errors).withContext('later invalid').toBeDefined();
  });

  it('should test form validity', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const form = component.form;
    expect(form.valid).withContext('first valid').toBeTruthy();

    const usernameInput = form.controls['username'];
    usernameInput.setValue('');

    const passwordInput = form.controls['password'];
    passwordInput.setValue('');

    expect(form.valid).withContext('later invalid').toBeFalsy();
  });

  it('should submit login form', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.form.valid).withContext('first valid').toBe(true);

    spyOn(component, 'handleSubmit');

    fixture.nativeElement.querySelector('form button').click();
    // fixture.debugElement.query(By.css('form button')).nativeElement.click();
    tick();

    expect(component.handleSubmit).toHaveBeenCalled();

    tick();

    expect(component.username?.value).toBe(mockUser.username);

    // service.user$.subscribe((user) => {
    //   expect(user?.username)
    //     .withContext('after form submit event')
    //     .toBe(mockUser?.username);
    // });
  }));

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Sign in to your account'
    );
  });
});
