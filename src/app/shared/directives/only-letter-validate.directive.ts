import { Directive,HostListener,ElementRef } from '@angular/core';

@Directive({
  selector: '[appOnlyLetterValidate]'
})
export class OnlyLetterValidateDirective {

  constructor(private elementRef:ElementRef){}
  @HostListener('input', ['$event'])
    onInput(event: Event) {
        this.elementRef.nativeElement.value = (<HTMLInputElement>event.currentTarget).value.replace(/[^a-zA-Z ]/g, '');
    }
}
