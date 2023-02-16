import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@app/components/home/home.component';
import { AuthComponent } from '@app/components/auth/auth.component';
import { RegisterComponent } from '@app/components/register/register.component';
import { AuthGuard } from '@app/_guards/auth.guard';
import { DeactivateGuard } from '@app/_guards/deactivate.guard';

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
    path: 'register',
    component: RegisterComponent,
    canDeactivate: [],
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'posts',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./posts/posts.module').then((m) => m.PostsModule),
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
