import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobCtcInfo } from 'src/app/recruiter/my-account/models/job-ctc-info.model';
import { JobInfo } from 'src/app/recruiter/my-account/models/job-info.model';
import { JobInterviewInfo } from 'src/app/recruiter/my-account/models/job-interview-info.model';
import { MatchingJobModel } from '../models/matching-job.model';
import { SeekerService } from '../seeker-services/seeker.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  matchingJobModel: MatchingJobModel = new MatchingJobModel();
  jobList:Array<MatchingJobModel> = new Array<MatchingJobModel>();
  jobInfo:JobInfo=new JobInfo();
  jobCtcInfo:JobCtcInfo=new JobCtcInfo();
  jobInterviewInfo:JobInterviewInfo=new JobInterviewInfo();
  isToggle:boolean=false;
  constructor(private router:Router,
    private seekerService:SeekerService,
    private sharedService:SharedService) { }

  ngOnInit() {
    this.getJobDetails();
  }

  getJobDetails(){
    let data = JSON.parse(localStorage.getItem('object'));
    if(data){
       let jobs=data.jobList.filter(x=>x.jobId!=data.jobId);
        this.jobList=jobs.filter(x=>x.jobsAppliedBySeeker!=true).slice(0,3);
        this.matchingJobModel.jobDescription=data.jobDetails.jobDescription;
        this.matchingJobModel.companyName=data.jobDetails.companyName;
        this.matchingJobModel.jobPostedDate=data.jobDetails.jobPostedDate;
        this.matchingJobModel.jobsAppliedBySeeker=data.jobDetails.jobsAppliedBySeeker;
        this.matchingJobModel.reqId=data.jobDetails.reqId;
        this.matchingJobModel.jobId=data.jobDetails.jobId;
        this.jobInfo=data.jobDetails.jobInfo;
        this.jobCtcInfo=data.jobDetails.jobCtcInfo;
        this.jobInterviewInfo=data.jobDetails.jobInterviewInfo;
        this.seekerService.updateSeekerNavigationToggleMessage(false);
        this.sharedService.updateApprovalMessage(environment.baseUrl+data.photo)
    }
  }
  replaceStrirng(description: any) {
    if (description != null && description != undefined) {
      let desc = description.replace(/<[^>]*>/g, '');
      return desc;
    }
  } 

   applyJob(matchingJob:MatchingJobModel){
    this.seekerService.applyJob(localStorage.getItem('email'),matchingJob.reqId,matchingJob.jobId).subscribe((result:any)=>{
      if(result=="True"){
        this.jobList.filter(x=>x.jobId==matchingJob.jobId)[0].jobsAppliedBySeeker=result=='True'?true:false;
      }
    })
  }
  appliedJob(){
    this.jobList=this.jobList.filter(x=>x.jobsAppliedBySeeker==true);
  } 
}
