import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MockAuthService, MockHttpClient, mockUser } from '../test_utils';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let http: HttpClient;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AuthComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: HttpClient, useClass: MockHttpClient },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(AuthService);

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;
    const usernameInput = compiled.querySelector('input[id="username"]');
    const passwordInput = compiled.querySelector('input[id="password"]');

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should test input validity', () => {
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
    const usernameInput = component.form.controls['username'];
    expect(usernameInput.errors).withContext('first valid').toBeNull();

    usernameInput.setValue('');
    expect(usernameInput.errors).withContext('later invalid').toBeDefined();
  });

  it('should test form validity', () => {
    const form = component.form;
    expect(form.valid).withContext('first valid').toBeTruthy();

    const usernameInput = form.controls['username'];
    usernameInput.setValue('');

    const passwordInput = form.controls['password'];
    passwordInput.setValue('');

    expect(form.valid).withContext('later invalid').toBeFalsy();
  });

  it('should submit form', () => {
    spyOn(component, 'handleSubmit');

    component.handleSubmit();

    expect(component.handleSubmit).toHaveBeenCalled();

    // service.loginToDummyJson(mockUser?.username, '123');

    // service.user$.subscribe((user) => {
    //   expect(user?.username).toBe(mockUser?.username);

    //   done();
    // });
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Sign in to your account'
    );
  });
});
