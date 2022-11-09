import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobCtcInfo } from 'src/app/recruiter/my-account/models/job-ctc-info.model';
import { JobInfo } from 'src/app/recruiter/my-account/models/job-info.model';
import { JobInterviewInfo } from 'src/app/recruiter/my-account/models/job-interview-info.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';
import { MatchingJobModel } from '../models/matching-job.model';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  matchingJobModel: MatchingJobModel = new MatchingJobModel();
  jobInfo:JobInfo=new JobInfo();
  jobCtcInfo:JobCtcInfo=new JobCtcInfo();
  jobInterviewInfo:JobInterviewInfo=new JobInterviewInfo();
  constructor(private router:Router,private sharedService:SharedService) { }

  ngOnInit() {
    this.getJobDetails();
  }

  getJobDetails(){
    this.sharedService.jobDetailsMessage.subscribe((result:any)=>{
      if(result){
        this.matchingJobModel.jobDescription=result.jobDescription;
        this.matchingJobModel.companyName=result.companyName;
        this.jobInfo=result.jobInfo;
        this.jobCtcInfo=result.jobCtcInfo;
        this.jobInterviewInfo=result.jobInterviewInfo;
        this.sharedService.profilePhotoMessage.subscribe(msg=>{
          this.sharedService.updateApprovalMessage(environment.baseUrl+ msg)
        })
      }
      else if(!result){
          this.router.navigate(['/seeqem/matching-job'])
      }
    })
  }
  replaceStrirng(description: any) {
    if (description != null && description != undefined) {
      let desc = description.replace(/<[^>]*>/g, '');
      return desc;
    }
  }
  back(){
      this.router.navigate(['/seeqem/matching-job'])
  }
}
