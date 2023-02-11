import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { DeactivateGuard } from './deactivate.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
    canDeactivate: [DeactivateGuard],
  },
  {
    path: 'calender',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./calender/calender.module').then((m) => m.CalenderModule),
  },
  {
    path: 'hooks',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./life-hooks/life-hooks.module').then((m) => m.LifeHooksModule),
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'image-cropper',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./image-cropper/image-cropper.module').then(
        (m) => m.ImageCropperModule
      ),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
