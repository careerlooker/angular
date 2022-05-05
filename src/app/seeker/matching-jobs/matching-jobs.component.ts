import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecruiterService } from 'src/app/recruiter/recruiter-services/recruiter.service';
import { BaseModel } from 'src/app/shared/models/base.model';
import { JobSeekerModel } from '../models/job-seeker-model';
import { SeekerService } from '../seeker-services/seeker.service';

@Component({
  selector: 'app-matching-jobs',
  templateUrl: './matching-jobs.component.html',
  styleUrls: ['./matching-jobs.component.css']
})
export class MatchingJobsComponent extends BaseModel implements OnInit {

  jobSeekerModel:JobSeekerModel=new JobSeekerModel();
  constructor(private recruiterService:RecruiterService, 
    private seekerService:SeekerService,   
    private toastr:ToastrService,
    private router:Router) {
    super();
   }

  ngOnInit() {
    this.getMatchingJob();
  }


  getMatchingJob(){
    this.email=localStorage.getItem('email');
    if (this.email != null) {
      this.seekerService.getExperienceList(this.email).subscribe((result: any) => {
        this.jobSeekerModel= result;
        this.seekerService.tickSubject.next("");
        this.seekerService.jobSeekerSubject.next(this.jobSeekerModel); 
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);
      })
    }
  }

}
