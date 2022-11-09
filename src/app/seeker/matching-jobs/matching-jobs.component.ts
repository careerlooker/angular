import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseModel } from 'src/app/shared/models/base.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';
import { JobSeekerModel } from '../models/job-seeker-model';
import { MatchingJobModel } from '../models/matching-job.model';
import { SeekerService } from '../seeker-services/seeker.service';

@Component({
  selector: 'app-matching-jobs',
  templateUrl: './matching-jobs.component.html',
  styleUrls: ['./matching-jobs.component.css']
})
export class MatchingJobsComponent extends BaseModel implements OnInit {

  matchingJobModel: Array<MatchingJobModel> = new Array<MatchingJobModel>();
  jobSeekerModel: JobSeekerModel = new JobSeekerModel();
  constructor(private sharedService:SharedService,
    private seekerService: SeekerService,
    private toastr: ToastrService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    if (this.email != null) {
      this.getSeeker()
    }
  }

  getSeeker() {
    this.seekerService.seekerLogin(this.email).subscribe((result: JobSeekerModel) => {
      if (result != null) {
        this.jobSeekerModel = result;
        this.sharedService.updateApprovalMessage(environment.baseUrl+this.jobSeekerModel.personalInfo.photo);
        this.seekerService.jobSeekerSubject.next(this.jobSeekerModel);
        this.getMatchingJob();
      }
    })
  }
  getMatchingJob() {
    this.seekerService.getMatchingJob(this.email, this.sort, this.pageNo).subscribe((result: any) => {
      this.matchingJobModel = result;
      this.seekerService.tickSubject.next("");
    }, (err: HttpErrorResponse) => {
      this.toastr.error(err.message);
    })

  }
  replaceStrirng(description: any) {
    if (description != null && description != undefined) {
      let desc = description.replace(/<[^>]*>/g, '');
      return desc;
    }
  }

  jobRefresh(refresh:string){
    this.sort=refresh;
    this.getMatchingJob();
  }

  jobDetails(job:any){
    if(job){
      this.router.navigate(['/seeqem/job-details',job.jobId]);
      this.sharedService.updateJobDetails(job);
      this.sharedService.updateProfilePhoto(this.jobSeekerModel.personalInfo.photo);
    }
  }
}
