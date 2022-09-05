import { NgModule ,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AutoMatchProfileComponent } from './auto-match-profile/auto-match-profile.component';
import { InterviewStatusComponent } from './interview-status/interview-status.component';
import { PricingComponent } from './pricing/pricing.component';
import { ScheduleInterviewComponent } from './schedule-interview/schedule-interview.component';
import { SearchCandidateComponent } from './search-candidate/search-candidate.component';
import { RecruiterRoutingModule } from './recruiter-routing.module';
import { ProfilePopupComponent } from './profile-popup/profile-popup.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FooterComponent } from '../footer/footer.component';
import { RecruiterService } from './recruiter-services/recruiter.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './my-account/profile/profile.component';
import { SharedModule } from '../shared/modules/shared.module';

@NgModule({
    declarations:[
        HomeComponent,
        AutoMatchProfileComponent,
        InterviewStatusComponent,
        PricingComponent,
        ScheduleInterviewComponent,
        SearchCandidateComponent,
       
        //ProfilePopupComponent,

       // HeaderComponent,
       // FooterComponent,
       // NavigationComponent,
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