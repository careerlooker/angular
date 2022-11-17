import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  activeIndex: number = 0;
  constructor(private sharedService:SharedService,
    private seekerService: SeekerService,
    private toastr: ToastrService) {
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
        this.seekerService.updatePersonalInfoMessage(this.jobSeekerModel);
        this.seekerService.updateSeekerNavigationToggleMessage(true)
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
  fixLength(skill: any){
    if(skill){
      let desc = skill.replace(/<[^>]*>/g, '');
      let descrip= desc.slice(0,51);
      return descrip.length>50?descrip+'.....':descrip;
    }
  }
  replaceStrirng(description: any) {
    if (description != null && description != undefined) {
      let desc = description.replace(/<[^>]*>/g, '');
      let descrip= desc.slice(0,151);
      return descrip.length>150?descrip+'.....':descrip;
    }
  }
 
  jobRefresh(refresh:string){
    this.sort=refresh;
    this.getMatchingJob();
  }

  jobDetails(job:any){
    if(job){
      let id=job.jobId;
      let data={
        'jobDetails':job,
        'photo':this.jobSeekerModel.personalInfo.photo,
        'jobList':this.matchingJobModel,
        'jobId':id
      }
      localStorage.setItem('object', JSON.stringify(data));
      localStorage.setItem('isToggle',JSON.stringify({'isToggle':false}));
      window.open('/seeqem/job-details/'+id,'_blank').focus();
    }
  }
}