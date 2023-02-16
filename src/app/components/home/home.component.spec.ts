import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AuthService } from 'src/app/_services/auth.service';
import { MockAuthService } from 'src/app/test_utils';
import { AddBannerComponent } from '../add-banner/add-banner.component';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let http: HttpClient;
  let service: AuthService;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [AddBannerComponent, HomeComponent],
      providers: [
        HttpClient,
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', fakeAsync(() => {
    // fakeAsync + tick [don't handle or track  http requests]
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    tick();
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello World!');
  }));
});
