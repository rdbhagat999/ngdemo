import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
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
