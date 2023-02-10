import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperModule as ImgCropperModule } from 'ngx-image-cropper';
import { ImageCropperComponent } from './image-cropper.component';
import { ImgCropperRoutingModule } from './img-cropper-routing.module';

@NgModule({
  declarations: [ImageCropperComponent],
  imports: [CommonModule, ImgCropperModule, ImgCropperRoutingModule],
})
export class ImageCropperModule {}
