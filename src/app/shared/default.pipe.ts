import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'default',
})
export class DefaultPipe implements PipeTransform {
  transform(
    value: string,
    fallback: string = '/assets/dreamy_nights.jpg'
  ): string {
    console.log(value);
    console.log(fallback);
    if (!value) {
      return fallback;
    }
    return value;
  }
}
