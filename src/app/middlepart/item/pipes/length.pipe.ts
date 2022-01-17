import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length',
  pure: true
})
export class LengthPipe implements PipeTransform {

  transform(input: string, maxLength: number): string {
    if(maxLength === null){
      maxLength = 512;
    }
    return (maxLength - input.length).toString();
  }

}
