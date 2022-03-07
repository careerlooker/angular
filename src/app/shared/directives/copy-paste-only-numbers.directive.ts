import { Directive, ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[appCopyPasteOnlyNumbers]'
})
export class CopyPasteOnlyNumbersDirective {
  constructor(private elementRef:ElementRef){}
  
  @HostListener('input', ['$event'])
    onInput(event: Event) {
        this.elementRef.nativeElement.value = (<HTMLInputElement>event.currentTarget).value.replace(/[^0-9]/g, '');
    }
}
