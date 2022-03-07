import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const childRoutes:Routes=[
        {path:'',component:MyProfileComponent,children:[
        {path:'',redirectTo:'personal-info',pathMatch:'full'},
        {path:'personal-info',component:PersonalInfoComponent},
        {path:'professional-summary',component:ProfessionalSummaryComponent},
        {path:'certificate',component:CertificationComponent},
        {path:'awards',component:AwardsComponent},
        {path:'contact-details',component:ContactDetailsComponent},
        {path:'education',component:EducationComponent},
        {path:'experience',component:ExperienceComponent},
        {path:'language',component:LanguageComponent},
        {path:'other-details',component:OtherDetailsComponent},
        {path:'r-and-d',component:ReviewAndDownloadComponent},
        {path:'skills',component:SkillsComponent},
        {path:'training',component:TrainingComponent}
      ]}
     
]
@NgModule({
  imports:[RouterModule.forChild(childRoutes)],
  exports:[RouterModule]
})
export class MyProfileRoutingModule{}