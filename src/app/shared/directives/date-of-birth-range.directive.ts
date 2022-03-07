import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[appDateOfBirthRange]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: DateOfBirthRangeDirective,
    multi: true
  }]
})
export class DateOfBirthRangeDirective implements Validator {

  @Output() birthDateChange = new EventEmitter();

  private el: any;
  constructor(private elRef: ElementRef) {
    this.el = elRef;
  }

  validate(control?: FormControl): { [key: string]: any } | null {
    let selectedDate: Date = control.value;
    if (selectedDate != null) {
      if (selectedDate.getFullYear() >= 1900 && selectedDate.getFullYear() <= 2000) {
        return null;
      } else if (selectedDate.getFullYear() > 2000) {
        return { 'dateBirth': true };
      }
    }
    else
    return null;
    /*else if(selectedDate==null){
    return { 'dateBirth': true};
  }*/
  }
  @HostListener('input', ["$event"])
  onInput(event: Event) {
    let date = (<HTMLInputElement>event.target).value;
    if (date.length > 4 || date.length > 10) {
      let date1 = date.split('/');
      if (date1[2].length == 4) {
        let newDate = date1[2] + '/' + date1[1] + '/' + date1[0];
        let selectedDate = new Date(newDate);
        if (selectedDate.getFullYear() >= 1900 && selectedDate.getFullYear() <= 2000) {
        
        }
        else if (selectedDate.getFullYear() > 2000) {
          this.el.value = selectedDate;//new Date('01/01/1900');
          this.birthDateChange.emit(this.el.value);          
        }
      }
    }
  }



  @HostListener('onSelect', ['$event'])
  onSelect(selectedDate: Date) {
    if (selectedDate.getFullYear() >= 1900 && selectedDate.getFullYear() <= 2000) {     
    } else if (selectedDate.getFullYear() > 2000) {
      this.el.value = selectedDate;//new Date('01/01/1900');
      this.birthDateChange.emit(this.el.value);     
    }
  }
}
