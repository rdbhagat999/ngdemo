import { Component } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
})
export class ImageCropperComponent {
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
    console.log('imageLoaded', image);
  }
  cropperReady() {
    // cropper ready
    console.log('cropperReady');
  }
  loadImageFailed() {
    // show message
    console.log('loadImageFailed');
  }
}
