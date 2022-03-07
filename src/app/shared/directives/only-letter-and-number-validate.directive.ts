import { Directive,HostListener,ElementRef } from '@angular/core';

@Directive({
  selector: '[appOnlyLetterAndNumberValidate]'
})
export class OnlyLetterAndNumberValidateDirective {

  constructor(private elementRef:ElementRef){}
  @HostListener('input', ['$event'])
    onInput(event: Event) {
        this.elementRef.nativeElement.value = (<HTMLInputElement>event.currentTarget).value.replace(/[^a-zA-Z0-9 ]/g, '');
    }
}
