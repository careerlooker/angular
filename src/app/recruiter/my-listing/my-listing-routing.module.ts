import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { CandidateManagerComponent } from './candidate-manager/candidate-manager.component';
import { JobPostComponent } from './job-post/job-post.component';
import { ManageJobPostComponent } from './manage-job-post/manage-job-post.component';
import { EditManageJobComponent } from './edit-manage-job/edit-manage-job.component';
import { MatchingProfileComponent } from './matching-profile/matching-profile.component';
import { MyListingComponent } from './my-listing.component';
import { ProfilesComponent } from "./profiles/profiles.component";
const childRoutes:Routes=[
        {path:'',component:MyListingComponent, children:[
        {path:'',redirectTo:'job-post',pathMatch:'full'},
        {path:'job-post',component:JobPostComponent},
        {path:'job-post/:id/:jobId',component:JobPostComponent},
        {path:'manage-job-post',component:ManageJobPostComponent},
        {path:'candidate-manager',component:CandidateManagerComponent},
        {path:'edit-job-post',component:EditManageJobComponent},
        // {path:'matching-profile',component:MatchingProfileComponent},
        {path:'matching-profile/:reqId/:jobId',component:ProfilesComponent}
        
    ]
        }]
@NgModule({
    imports:[RouterModule.forChild(childRoutes)],
    exports:[RouterModule]
})
export class MyListingRoutingModule{}