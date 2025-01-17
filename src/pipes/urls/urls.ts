import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
/**
 * Generated class for the UrlsPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'urls',
})
export class UrlsPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  constructor(private sanitizer: DomSanitizer){

  }  

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
