import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeekerRoutingModule } from './seeker-routing.module';
import { MatchingJobsComponent } from './matching-jobs/matching-jobs.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ToDoComponent } from './to-do/to-do.component';
import { SettingsComponent } from './settings/settings.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { BlockCompaniesComponent } from './block-companies/block-companies.component';
import { MsgBoxComponent } from './msg-box/msg-box.component';
import { SharedModule } from '../shared/modules/shared.module';
import { JobDetailsComponent } from './job-details/job-details.component';
import { HomeComponent } from './home/home.component';



@NgModule({
    declarations:[
        MatchingJobsComponent,
      //  MyProfileComponent,
        ToDoComponent,
        SettingsComponent,
        MyApplicationsComponent,
        BlockCompaniesComponent,
        MsgBoxComponent,
        JobDetailsComponent,
        HomeComponent
      
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        SeekerRoutingModule
     
    ],
    exports:[],
    providers:[],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class SeekerModule{}