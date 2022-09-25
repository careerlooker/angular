import { forwardRef, NgModule } from '@angular/core';
import {RichTextEditorAllModule, RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor'; 
import { TextEditorComponent } from '../components/text-editor/text-editor.component';
import { StarRatingComponent } from '../components/star-rating/star-rating.component';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { CopyPasteOnlyNumbersDirective } from '../directives/copy-paste-only-numbers.directive';
import { DateOfBirthRangeDirective } from '../directives/date-of-birth-range.directive';
import { EmailValidationDirective } from '../directives/email-validation.directive';
import { OnlyLetterAndNumberValidateDirective } from '../directives/only-letter-and-number-validate.directive';
import { OnlyLetterValidateDirective } from '../directives/only-letter-validate.directive';
import { RestrictFutureDateDirective } from '../directives/restrict-future-date.directive';
import { ValidatePhoneNumberDirective } from '../directives/validate-phone-number.directive';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { FileUploadComponent } from '../components/file-upload/file-upload.component';
import { DropdownDirective } from '../directives/app-dropdown.directive';
import { RatingModule } from 'ng-starrating';
import { AllownumbersonlyDirective } from '../directives/allow-numbers-only.directive';
import { PrimengModule } from './primeng.module';
import { Calendar, CalendarModule } from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import { FilterPipe } from '../pipes/filter.pipe';
@NgModule({
    declarations:[
        TextEditorComponent,
        StarRatingComponent,
        SpinnerComponent,
        CopyPasteOnlyNumbersDirective,
        DateOfBirthRangeDirective,
        EmailValidationDirective,
        OnlyLetterAndNumberValidateDirective,
        OnlyLetterValidateDirective,
        RestrictFutureDateDirective,
        ValidatePhoneNumberDirective,
        FileUploadComponent,
        DropdownDirective,
        AllownumbersonlyDirective,
        FilterPipe
    ],
    imports:[
        CommonModule,
        RichTextEditorModule,
        FormsModule,
        FileUploadModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        RichTextEditorAllModule,
        RatingModule,
        CalendarModule,
        TableModule
    ],
    exports:[
        TextEditorComponent,
        StarRatingComponent,
        SpinnerComponent,
        CopyPasteOnlyNumbersDirective,
        DateOfBirthRangeDirective,
        EmailValidationDirective,
        OnlyLetterAndNumberValidateDirective,
        OnlyLetterValidateDirective,
        RestrictFutureDateDirective,
        ValidatePhoneNumberDirective,
        FileUploadComponent,
        DropdownDirective,
        AllownumbersonlyDirective,
        FilterPipe

    ],
    providers:[
        
    ]

})
export class SharedModule{
}