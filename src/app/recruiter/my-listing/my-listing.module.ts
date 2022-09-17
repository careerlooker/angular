import { NgModule ,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { MyListingRoutingModule } from './my-listing-routing.module';
import { CandidateManagerComponent } from './candidate-manager/candidate-manager.component';
import { EditManageJobComponent } from './edit-manage-job/edit-manage-job.component';
import { JobPostComponent } from './job-post/job-post.component';
import { ManageJobPostComponent } from './manage-job-post/manage-job-post.component';
import { MatchingProfileComponent } from './matching-profile/matching-profile.component';
import { MyListingComponent } from './my-listing.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/modules/shared.module';
//import { NgbCalendar, NgbCalendarHebrew, NgbDatepickerI18n, NgbDatepickerI18nHebrew } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations:[
        MyListingComponent,
        CandidateManagerComponent,
        EditManageJobComponent,
        JobPostComponent,
        ManageJobPostComponent,
        MatchingProfileComponent,
    ],
    imports:[
        CommonModule,
        FormsModule,
        SharedModule,
        NgMultiSelectDropDownModule.forRoot(),
        MyListingRoutingModule
    ],
    exports:[],
    // providers:[
    //     {provide: NgbCalendar, useClass: NgbCalendarHebrew},
    // {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nHebrew}
    //],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class MyListingModule{}