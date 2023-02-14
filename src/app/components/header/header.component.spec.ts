import { HttpClient } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { MockAuthService, MockHttpClient, mockUser } from '../../test_utils';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let http: HttpClient;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: HttpClient, useClass: MockHttpClient },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(AuthService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display login link', fakeAsync(() => {
    // fakeAsync + tick [don't handle or track  http requests]

    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();

    tick();

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a.login')?.textContent).toContain('Login');
  }));

  it('should display logout link', fakeAsync(() => {
    // fakeAsync + tick [don't handle or track  http requests]

    service.loginToDummyJson(mockUser.username, '123');
    spyOn(component, 'ngOnInit');
    component.ngOnInit();

    expect(component.ngOnInit).toHaveBeenCalled();

    tick();

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a.logout')?.textContent).toContain('Logout');
  }));
});
