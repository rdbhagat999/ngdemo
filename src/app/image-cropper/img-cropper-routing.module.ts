import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageCropperComponent } from './image-cropper.component';

const routes: Routes = [{ path: '', component: ImageCropperComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImgCropperRoutingModule {}
