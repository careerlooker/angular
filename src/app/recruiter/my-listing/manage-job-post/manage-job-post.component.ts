import { Component, OnInit } from '@angular/core';
import { RecruiterService } from '../../recruiter-services/recruiter.service';
import { SearchJob } from '../models/search-job.model';
import { Router } from '@angular/router';
import { JobOperationModel } from '../models/job-operation.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { PostedJobs } from '../../my-account/models/posted-jobs.model';
import { PostedJobsResponse } from '../../my-account/models/posted-jobs-response.model';
import { JobCtcInfo } from '../../my-account/models/job-ctc-info.model';
import { JobInfo } from '../../my-account/models/job-info.model';
import { JobInterviewInfo } from '../../my-account/models/job-interview-info.model';

@Component({
  selector: 'app-manage-job-post',
  templateUrl: './manage-job-post.component.html',
  styleUrls: ['./manage-job-post.component.css']
})
export class ManageJobPostComponent implements OnInit {
  postedJobList:Array<PostedJobsResponse>=new Array<PostedJobsResponse>();
  search:SearchJob=new SearchJob();
  jobOperation:JobOperationModel=new JobOperationModel();
  paging:boolean= false;
  page:number=0;
  reqId:number;
  constructor(private recruiterService:RecruiterService,
              private router:Router,
              private toastr:ToastrService) { }

  ngOnInit() {
    this.reqId=+JSON.parse(localStorage.getItem('reqId'));
    this.getPostedJob();
  }
 
  getPostedJob(){
    this.recruiterService.getJobById(this.reqId).subscribe((result:any)=>{
      this.postedJobList=result;
      this.setPaging();
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message);})
  }

  deleteJob(id:number){
     let array=[]
     array.push(8);
     array.push(9)
    this.recruiterService.deleteJob(this.reqId,array).subscribe((result:any)=>{
      this.toastr.success('Job has been deleted successfully');
      this.getPostedJob();
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message);})
  }
  copyJob(jobId:number){
    if(jobId){
      let postedJobList=this.filterJobById(jobId,'copy')
      this.recruiterService.copyJob(this.reqId,postedJobList).subscribe((result:any)=>{
      this.toastr.success('Job has been copied successfully');
      this.getPostedJob();
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message);})
  }
}

private filterJobById(jobId:number,jobType:string){
  let postedJob=new PostedJobs();
  let job=this.postedJobList.filter(x=>x.jobId==jobId)[0];
    postedJob.aboutCompany=job.aboutCompany;
    postedJob.companyName=job.companyName;
    postedJob.jobDescription=job.jobDescription;
    postedJob.jobCtcInfo=new JobCtcInfo();
    postedJob.jobCtcInfo=job.jobCtcInfo;
    postedJob.jobInfo=new JobInfo();
    postedJob.jobInfo=job.jobInfo;
    postedJob.jobInterviewInfo=new JobInterviewInfo();
    postedJob.jobInterviewInfo=job.jobInterviewInfo;
    postedJob.jobStatus="1";
    postedJob.jobVisibility=job.jobVisibility;
    if(jobType=='copy'){
      let postedJobs=new Array<PostedJobs>();
    postedJobs.push(postedJob);
    var postedJobList={"postedJobs":postedJobs};
    return postedJobList;
    }
    if(jobType=='edit'){
      return postedJob;
    }
}
  navigateJobPost(jobId:number){
    if(jobId){
      this.router.navigate(['/reqem/my-lising/job-post'],{queryParams:{reqId:this.reqId,jobId:jobId}});
    }
  }
  searchJob(){
    let fromDate=new Date(this.search.startDate);
    let toDate=new Date(this.search.endDate);
    if(fromDate <=toDate){
     this.search.reqId=this.reqId;
      this.recruiterService.jobSearch(this.search).subscribe((result:any)=>{
         if(result){
          this.postedJobList=result;
          console.log(this.postedJobList);
         }
         else{
          this.postedJobList=[];
         }
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);})
      }
      else{
        this.toastr.info('From Date should be less than To Date')
      }
  }


  nextPage(){
    this.page+=1;
    if(this.page!=0){
      this.getPostedJob();
    }
  }
  previousPage (){
    this.page-=1;
    if(this.page>=0){
      this.getPostedJob();
    }else if(this.page<0){
      this.page=0;
    }
  }
  setPaging(){
    if(this.postedJobList.length==5){
      this.paging=true
    }else{
      this.paging=false;
    }
  }
}
