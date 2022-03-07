import { Directive, HostListener, Output, EventEmitter, ElementRef, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, FormControl } from '@angular/forms';


@Directive({
  selector: '[appRestrictFutureDate]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: RestrictFutureDateDirective,
    multi: true
  }]
})
export class RestrictFutureDateDirective implements Validator {

  @Output() valueChange = new EventEmitter();

  private el: any;  
  constructor(private elRef: ElementRef) {
    this.el = elRef;
  }

  validate(control?: FormControl): { [key: string]: any } | null {
    let selectedDate = control.value;
    let currentDate = new Date(); 
    if (selectedDate > currentDate) {     
    return  { 'selectDate': true }    
    }
      return  null;    
  }
  @HostListener('change', ["$event"])
  onChange(event: Event) {
    let date = (<HTMLInputElement>event.target).value;
    if (date.length > 4 || date.length > 10) {
       let date1=date.split('/');
      if (date1[2].length == 4) {
        let newDate = date1[2] + '/' + date1[1] + '/' + date1[0];
        let selectedDate = new Date(newDate);
        let currentDate = new Date();
        if (selectedDate > currentDate) {
          this.el.value = new Date();
          this.valueChange.emit(this.el.value);
        } 
        else
        {
          this.valueChange.emit(date);
        }      
      }
    }
  }

  @HostListener('onSelect', ['$event'])
  onSelect(selectedDate: Date) {
    let currentDate = new Date();
    if (selectedDate > currentDate) {
      this.el.value = new Date();
      this.valueChange.emit(this.el.value);     
    }    
  }
}

