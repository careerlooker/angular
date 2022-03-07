import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { MyProfileRoutingModule } from './my-profile.routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile.component';
import { CertificationComponent } from './my-resume/certification/certification.component';
import { ContactDetailsComponent } from './my-resume/contact-details/contact-details.component';
import { EducationComponent } from './my-resume/education/education.component';
import { ExperienceComponent } from './my-resume/experience/experience.component';
import { LanguageComponent } from './my-resume/language/language.component';
import { OtherDetailsComponent } from './my-resume/other-details/other-details.component';
import { PersonalInfoComponent } from './my-resume/personal-info/personal-info.component';
import { ProfessionalSummaryComponent } from './my-resume/professional-summary/professional-summary.component';
import { ReviewAndDownloadComponent } from './my-resume/review-and-download/review-and-download.component';
import { SkillsComponent } from './my-resume/skills/skills.component';
import { TrainingComponent } from './my-resume/training/training.component';
import { AwardsComponent } from './my-resume/awards/awards.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
    declarations:[
     MyProfileComponent,
     AwardsComponent,
     CertificationComponent,
     ContactDetailsComponent,
     EducationComponent,
     ExperienceComponent,
     LanguageComponent,
     OtherDetailsComponent,
     PersonalInfoComponent,
     ProfessionalSummaryComponent,
     ReviewAndDownloadComponent,
     SkillsComponent,
     TrainingComponent,
    ],
    imports:[
        CommonModule,
        FormsModule,
        SharedModule,
        NgMultiSelectDropDownModule.forRoot(),
        MyProfileRoutingModule,
        
    ],
    exports:[],
    providers:[],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class MyProfileModule{}