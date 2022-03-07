import { NgModule } from "@angular/core";
import {Routes,RouterModule} from '@angular/router';
import { AutoMatchProfileComponent } from './auto-match-profile/auto-match-profile.component';
import { SearchCandidateComponent } from './search-candidate/search-candidate.component';
import { PricingComponent } from './pricing/pricing.component';
import { ScheduleInterviewComponent } from './schedule-interview/schedule-interview.component';
import { InterviewStatusComponent } from './interview-status/interview-status.component';
import { HomeComponent } from './home/home.component';
import { RecruiterHomeComponent } from './recruiter-home/recruiter-home.component';

const childRoutes:Routes=[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'auto-match-profile',component:AutoMatchProfileComponent},
    {path:'search-candidate',component:SearchCandidateComponent},
    {path:'pricing',component:PricingComponent},
    {path:'interview-schedule',component:ScheduleInterviewComponent},
    {path:'interview-status',component:InterviewStatusComponent},
  
]
@NgModule({
    imports:[RouterModule.forChild(childRoutes)],
    exports:[RouterModule]
})
export class RecruiterRoutingModule{}