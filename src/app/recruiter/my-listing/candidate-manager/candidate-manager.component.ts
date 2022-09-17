import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseModel } from 'src/app/shared/models/base.model';
import { JobCtcInfo } from '../../my-account/models/job-ctc-info.model';
import { JobInfo } from '../../my-account/models/job-info.model';
import { JobInterviewInfo } from '../../my-account/models/job-interview-info.model';
import { PostedJobsResponse } from '../../my-account/models/posted-jobs-response.model';
import { PostedJobs } from '../../my-account/models/posted-jobs.model';
import { RecruiterModel } from '../../my-account/models/recruiter.model';
import { RecruiterService } from '../../recruiter-services/recruiter.service';

@Component({
  selector: 'app-candidate-manager',
  templateUrl: './candidate-manager.component.html',
  styleUrls: ['./candidate-manager.component.css']
})
export class CandidateManagerComponent extends BaseModel implements OnInit {
  recruiterModel:RecruiterModel=new RecruiterModel();
  postedJobs:PostedJobsResponse=new PostedJobsResponse();
  postedJobList:Array<PostedJobsResponse>=new Array<PostedJobsResponse>();
  reqId:number;
  constructor(private recruiterService:RecruiterService,
    private toastr:ToastrService
              ) { super()}

  ngOnInit() {
   // this.getCandidateDetails();
   this.getPostedJob();
  }

  getCandidateDetails(){
    this.email=localStorage.getItem('email');
    this.recruiterService.getRecruiterDetails(this.email).subscribe((result:RecruiterModel)=>{
      this.recruiterModel=result;
    });
  }

  getPostedJob(){
    this.reqId=+JSON.parse(localStorage.getItem('reqId'));
    this.recruiterService.getJobById(this.reqId).subscribe((result:any)=>{
      if(result){
        result.forEach((e:any) => {
        this.postedJobs=new PostedJobsResponse();
        this.postedJobs.aboutCompany=e.aboutCompany;
        this.postedJobs.companyName=e.companyName;
        this.postedJobs.jobDescription=e.jobDescription;
        this.postedJobs.jobInfo=new JobInfo();
        this.postedJobs.jobInfo=e.jobInfo;
        this.postedJobs.jobCtcInfo=new JobCtcInfo();
        this.postedJobs.jobInterviewInfo=e.jobCtcInfo;
        this.postedJobs.jobInterviewInfo=new JobInterviewInfo();
        this.postedJobs.jobInterviewInfo=e.jobInterviewInfo;
        this.postedJobs.jobPostedDate=e.jobPostedDate;
        this.postedJobs.matchingPercentage=e.matchingPercentage;
        this.postedJobs.jobStatus=e.jobStatus;
        this.postedJobList.push(this.postedJobs)
       });
      }
      else{
        this.postedJobList=[];
      }
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message);})
  }
}
