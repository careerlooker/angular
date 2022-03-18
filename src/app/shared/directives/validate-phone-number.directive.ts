import { Directive,ElementRef,HostListener} from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  selector: '[appValidatePhoneNumber]',
  providers:[{
    provide:NG_VALIDATORS,
    useExisting:ValidatePhoneNumberDirective,
    multi:true
  }]
})
export class ValidatePhoneNumberDirective  implements Validator{

  constructor(private elementRef:ElementRef){}
  validate(control:FormControl):{[key:string]:any}|null{
   let str =control.value;
   if(str!=null){
     
    //let firstTwo =String(str).substring(0, 2);

    //if((firstTwo !== "91" && control.value!=='' && control.value!=null)){
    //  return {'defaultSelect':true}
    //}
    //else{
      if(str.length!=10 )
      return  {'defaultSelect':true}
      if(str.length==10)
      return  null
      }          
  //}
}

  @HostListener('blur', ['$event'])
    onBlur(event: Event) {

      let str =this.elementRef.nativeElement.value;
      //let firstTwo = str.substring(0, 2);
     // if (firstTwo !== "91" && firstTwo.length === 2) {
        //this.elementRef.nativeElement.value="";                   
      //}else
       if(str.length!=10){
        this.elementRef.nativeElement.value="";      
      }
      else {   
        this.elementRef.nativeElement.value = (<HTMLInputElement>event.currentTarget).value.replace(/[^0-9]/g, '');       
      }
    }

}
