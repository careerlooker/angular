import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FilterModel } from 'src/app/recruiter/models/filter.model';
import { FunctionalAreaModel } from 'src/app/recruiter/my-listing/models/functional-area.model';
import { IndustryModel } from 'src/app/recruiter/my-listing/models/industry.model';
import { BaseModel } from 'src/app/shared/models/base.model';
import { CityModel } from 'src/app/shared/models/city.model';
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
  filterModel:FilterModel=new FilterModel();
  cityDropdownList:Array<CityModel>=new Array<CityModel>();
  functionalAreaList:Array<FunctionalAreaModel>=new Array<FunctionalAreaModel>();
  industryList:Array<IndustryModel>=new Array<IndustryModel>();
  selectedCity:string;
  activeIndex: number = 0;
  constructor(private sharedService:SharedService,
    private seekerService: SeekerService,
    private toastr: ToastrService) {
    super();
  }

  ngOnInit() {
    this.getAllCity();
    this.getfunctionalArea();
    this.getIndustryList();
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
    this.seekerService.getMatchingJob(this.email, this.sort, this.pageNo,this.filterModel).subscribe((result: any) => {
      this.matchingJobModel = result;
      this.seekerService.tickSubject.next("");
    }, (err: HttpErrorResponse) => {
      this.toastr.error(err.message);
    })

  }
  fixLength(skill: any){
    if(skill){
      let desc = skill.replace(/<[^>]*>/g, '');
      let descrip= desc.slice(0,61);
      return descrip.length>60?descrip+'.....':descrip;
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
  applyJob(matchingJob:MatchingJobModel){
    this.seekerService.applyJob(this.email,matchingJob.reqId,matchingJob.jobId).subscribe((result:any)=>{
      if(result=="True"){
        this.matchingJobModel.filter(x=>x.jobId==matchingJob.jobId)[0].jobsAppliedBySeeker=result=='True'?true:false;
      }
    })
  }
  appliedJob(){
    this.matchingJobModel=this.matchingJobModel.filter(x=>x.jobsAppliedBySeeker==true);
  }
  getAllCity(){
    this.sharedService.getAllCities().subscribe((result:Array<CityModel>)=>{
      if(result){
        this.cityDropdownList=result;
      }
    })
  }
  selectLocation(city:any){
    if(city){
      this.filterModel.location=this.cityDropdownList.filter(x=>x.name==city)[0].name;
    }
  }
  getfunctionalArea(){
    this.sharedService.getfunctionalAreaList().subscribe((result:Array<FunctionalAreaModel>)=>{
        this.functionalAreaList=result;
    })
  }
  onFunAreaSelect(event){
    this.filterModel.functinalArea=event;
  }

  getIndustryList(){
    this.sharedService.getIndustryList().subscribe((result:Array<IndustryModel>)=>{
      this.industryList=result;
    })
  }
  onIndustrySelect(event){
    this.filterModel.industries=event;
  }
  experienceList=[
    {"minMaxExp":"0-1"},
    {"minMaxExp":"1-3"},
    {"minMaxExp":"3-6"},
    {"minMaxExp":"6-10"},
    {"minMaxExp":"10-15"},
    {"minMaxExp":"15+"},
  ] 
  onExperienceSelect(event:any){
    if(event){
      let expList=[];
      if(event=="15+ years"){
        expList=event.split('+')
        this.filterModel.minExp=expList[0];
        this.filterModel.maxExp=expList[0];
      }else{
        expList=event.split('-');
        this.filterModel.minExp=expList[0];
        let max=expList[1];
        let expMax=max.split(' ');
        this.filterModel.maxExp=expMax[0];
        this.filterModel.experience=event;
      }  
    }
  } 
  matchingPercentage:string;
  matchingPercentageList=[
    {"match":"0-25"},
    {"match":"25-50"},
    {"match":"50-75"},
    {"match":"75-100"},
  ]
  onSelectMatching(event:string){
    if(event){
      let matchList=event.split('-');
      let matched=matchList[1];
      let realMatch=matched.split(' ');
      this.filterModel.matchingPercentage=realMatch[0];
      this.matchingPercentage=event;
    }
  }
  resetAll()
  {
      this.filterModel=new FilterModel();
      this.matchingPercentage=null;
      this.getMatchingJob();
  }

}