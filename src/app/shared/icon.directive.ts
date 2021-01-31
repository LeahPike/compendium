import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appIcon]'
})
export class IconDirective implements OnChanges {

  @Input()
  appIcon: string;

  @Input()
  size: number; // 18, 36 or 56

  image: HTMLImageElement;

  constructor(el: ElementRef) {
    this.image = el.nativeElement;
  }

  ngOnChanges(): void {

    let baseUrl = 'https://render-eu.worldofwarcraft.com/icons';

    if (this.size) {
      baseUrl = baseUrl + '/' + this.size + '/';
    } else {
      baseUrl = baseUrl + '/36/';
    }

    if (this.appIcon) {
      this.image.src = baseUrl + this.appIcon + '.jpg';
    } else {
      this.image.src = baseUrl + 'inv_misc_questionmark.jpg';
    }

    this.image.classList.add('border');
    this.image.classList.add('border-secondary');
    this.image.classList.add('rounded');
  }
}
