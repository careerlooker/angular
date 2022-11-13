import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatchingJobsComponent } from './matching-jobs/matching-jobs.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ToDoComponent } from './to-do/to-do.component';
import { SettingsComponent } from './settings/settings.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { BlockCompaniesComponent } from './block-companies/block-companies.component';
import { MsgBoxComponent } from './msg-box/msg-box.component';
import { ProfileComponent } from '../recruiter/my-account/profile/profile.component';
import { JobDetailsComponent } from './job-details/job-details.component';

const childRoutes:Routes=[
    //   {path:'',redirectTo:'my-profile',pathMatch:'full'},
    //   {path:'my-profile',component:MyProfileComponent,loadChildren:'../seeker/my-profile/my-profile.module#MyProfileModule'},
      {path:'',redirectTo:'matching-job',pathMatch:'full'},
      {path:'matching-job',component:MatchingJobsComponent},
      {path:'job-details/:jobId', component:JobDetailsComponent},
      {path:'to-do',component:ToDoComponent},
      {path:'settings',component:SettingsComponent},
      {path:'my-applications',component:MyApplicationsComponent},
      {path:'block-companies',component:BlockCompaniesComponent},
      {path:'msg-box',component:MsgBoxComponent}

      
   
]
@NgModule({
    imports:[RouterModule.forChild(childRoutes)],
    exports:[RouterModule]
})
export class SeekerRoutingModule{}