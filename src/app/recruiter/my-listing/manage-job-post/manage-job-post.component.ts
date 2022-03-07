import { Component, OnInit } from '@angular/core';

import { RecruiterService } from '../../recruiter-services/recruiter.service';
import { JobPosting } from '../models/job-posting.model';
import { SearchJob } from '../models/search-job.model';
import { Router } from '@angular/router';
import { JobOperationModel } from '../models/job-operation.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-job-post',
  templateUrl: './manage-job-post.component.html',
  styleUrls: ['./manage-job-post.component.css']
})
export class ManageJobPostComponent implements OnInit {
  postedJobList:Array<JobPosting>=new Array<JobPosting>();
  search:SearchJob=new SearchJob();
  jobOperation:JobOperationModel=new JobOperationModel();
  paging:boolean= false;
  page:number=0;
  constructor(private recruiterService:RecruiterService,
              private router:Router,
              private toastr:ToastrService) { }

  ngOnInit() {
    this.getPostedJob();
  }

  getPostedJob(){
    this.recruiterService.getPostedJobList(this.page).subscribe((result:Array<JobPosting>)=>{
      this.postedJobList=result;
      this.setPaging();
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message);})
  }

  deleteJob(id:number){
    this.jobOperation.id=id;
    this.jobOperation.reqId=+JSON.parse(localStorage.getItem('reqId'));
    this.recruiterService.deleteJob(this.jobOperation).subscribe((result:any)=>{
      this.toastr.success('Job has been deleted successfully');
      this.getPostedJob();
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message);})
  }
  copyJob(id:number){
    this.jobOperation.id=id;
    this.jobOperation.reqId=+JSON.parse(localStorage.getItem('reqId'));
    this.recruiterService.deleteJob(this.jobOperation).subscribe((result:any)=>{
      this.toastr.success('Job has been copied successfully');
      this.getPostedJob();
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message);})
  }
  navigateJobPost(id:number){
      this.router.navigate(['/reqem/my-lising/job-post'],{queryParams:{id:id}});
  }
  searchJob(search:SearchJob){
      this.search.from=search.from;
      this.search.to=this.search.to;
      this.recruiterService.jobSearch(this.search).subscribe((result:Array<JobPosting>)=>{
          this.postedJobList=result;
          console.log(this.postedJobList);
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);})
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
