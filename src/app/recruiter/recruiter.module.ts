import { NgModule ,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AutoMatchProfileComponent } from './auto-match-profile/auto-match-profile.component';
import { InterviewStatusComponent } from './interview-status/interview-status.component';
import { PricingComponent } from './pricing/pricing.component';
import { ScheduleInterviewComponent } from './schedule-interview/schedule-interview.component';
import { SearchCandidateComponent } from './search-candidate/search-candidate.component';
import { RecruiterRoutingModule } from './recruiter-routing.module';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/modules/shared.module';

@NgModule({
    declarations:[
        HomeComponent,
        AutoMatchProfileComponent,
        InterviewStatusComponent,
        PricingComponent,
        ScheduleInterviewComponent,
        SearchCandidateComponent,
      
        MainHeaderComponent,
        MainPageComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        RecruiterRoutingModule,

    ],
    exports:[],
    providers:[],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class RecruiterModule{}