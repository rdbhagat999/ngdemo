import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SocialAuthComponent } from './social-auth/social-auth.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  // {
  //   path: 'auth',
  //   component: SocialAuthComponent,
  // },
  {
    path: 'calender',
    loadChildren: () =>
      import('./calender/calender.module').then((m) => m.CalenderModule),
  },
  {
    path: 'hooks',
    loadChildren: () =>
      import('./life-hooks/life-hooks.module').then((m) => m.LifeHooksModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'image-cropper',
    loadChildren: () =>
      import('./image-cropper/image-cropper.module').then(
        (m) => m.ImageCropperModule
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
