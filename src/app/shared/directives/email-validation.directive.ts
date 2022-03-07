import { Directive, ElementRef,HostListener } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appEmailValidation]',
  providers: [
    {
      provide: NG_VALIDATORS, 
      useExisting: 
      EmailValidationDirective, 
      multi: true
    }
  ]
})
export class EmailValidationDirective {

  constructor(private elRef:ElementRef){}
  public validate(control: AbstractControl): {[key: string]: any} {
    let emailRegEx = /\S+@\S+\.\S+/  ///^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    let valid = emailRegEx.test(control.value);
    return control.value < 1 || valid ? null : {'isEmail': true};
}
 /*@HostListener('blur', ['$event'])
    onBlur(event:Event){
      let emailreg=/\S+@\S+\.\S+/;
      let valid=emailreg.test((<HTMLInputElement>event.currentTarget).value);
      if(!valid)
      this.elRef.nativeElement.value='';
    }*/
}
