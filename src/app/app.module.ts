import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AuthComponent } from '@app/components/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from '@app/_interceptors/auth.interceptor';
import { SharedModule } from '@app/_shared/shared.module';
import { AppComponent } from '@app/components/app.component';
import { HomeComponent } from '@app/components/home/home.component';
import { HeaderComponent } from '@app/components/header/header.component';
import { FooterComponent } from '@app/components/footer/footer.component';
import { AuthGuard } from '@app/_guards/auth.guard';
import { DeactivateGuard } from '@app/_guards/deactivate.guard';
import { CacheInterceptor } from '@app/_interceptors/cache.interceptor';
import { HttpErrorInterceptor } from '@app/_interceptors/http-error.interceptor';
import { GlobalErrorHandlerService } from '@app/_services/global-error-handler.service';
import { AdCardComponent } from '@app/components/ad-card/ad-card.component';
import { AddBannerComponent } from '@app/components/add-banner/add-banner.component';
import { RegisterComponent } from '@app/components/register/register.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    AdCardComponent,
    AddBannerComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule, // required animations module
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    CookieService,
    AuthGuard,
    DeactivateGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
