import { Component, OnInit, ViewChild } from '@angular/core';
import { CountriesModel } from 'src/app/shared/models/countries.model';
import { StatesModel } from 'src/app/shared/models/states.model';
import { CityModel } from 'src/app/shared/models/city.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { RecruiterService } from '../../recruiter-services/recruiter.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { IndustryModel } from '../models/industry.model';
import { FunctionalAreaModel } from '../models/functional-area.model';
import { QualificationModel } from '../models/qualification.model';
import { KeySkillsModel } from '../models/key-skills.model';
import { Router } from '@angular/router';
import { RecruiterModel } from '../../my-account/models/recruiter.model';
import { JobCtcInfo } from '../../my-account/models/job-ctc-info.model';
import { PostedJobs } from '../../my-account/models/posted-jobs.model';
import { JobInterviewInfo } from '../../my-account/models/job-interview-info.model';
import { JobInfo } from '../../my-account/models/job-info.model';
import { NgForm } from '@angular/forms';
import { TextEditorComponent } from 'src/app/shared/components/text-editor/text-editor.component';





@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent implements OnInit {
  @ViewChild(TextEditorComponent) textEditorComponent: TextEditorComponent;
  recruiterModel:RecruiterModel=new RecruiterModel();
  jobInfo:JobInfo=new JobInfo();
  jobCtcInfo:JobCtcInfo=new JobCtcInfo();
  postedJob:PostedJobs=new PostedJobs();
  postedJobList:Array<PostedJobs>=new Array<PostedJobs>();
  jobInterviewInfo:JobInterviewInfo=new JobInterviewInfo();


 
  email: string;
  countryList: Array<CountriesModel>;
  stateList: Array<StatesModel>;
  cityList: Array<CityModel>;
  industryList:Array<IndustryModel>;
  functionalAreaList:Array<FunctionalAreaModel>;
  qualificationList:Array<QualificationModel>;
  keySkillsDropdownList:Array<KeySkillsModel>;
  selectedSkills: Array<KeySkillsModel>;
  selectedskills: Array<KeySkillsModel>;
  countryname: string;
  statename: string;
  jobId:number=0;

  cityDropdownList: Array<CityModel>;
  selectedCity: Array<CityModel>;
  selectedcities: Array<CityModel>;
  selectedcountry:Array<CountriesModel>;

  dropdownSettings :{};
  singleDropdownSettings:{};

  constructor(private sharedService:SharedService, 
              private recruiterService:RecruiterService,
              private toastr:ToastrService,
              private router:Router) { 
              
                this.dropdownSettings = {
                  singleSelection: false,
                  idField: 'id',
                  textField: 'name',
                  selectAllText: 'Select All',
                  unSelectAllText: 'UnSelect All',
                  itemsShowLimit: 3,
                  allowSearchFilter: true,
                  defaultOpen:false
                };

                this.singleDropdownSettings = {
                  singleSelection: true,
                  idField: 'id',
                  textField: 'name',
                  selectAllText: 'Select All',
                  unSelectAllText: 'UnSelect All',
                  itemsShowLimit: 1,
                  allowSearchFilter: true,
                  defaultOpen:false
                };
              }

  expMin=[
  {"minExp":0},{"minExp":1},{"minExp":2},{"minExp":3},{"minExp":4},{"minExp":5},{"minExp":6},{"minExp":7},{"minExp":8},{"minExp":9},{"minExp":10},
  {"minExp":11},{"minExp":12},{"minExp":13},{"minExp":14},{"minExp":15},{"minExp":16},{"minExp":17},{"minExp":18},{"minExp":19},{"minExp":20},
  {"minExp":21},{"minExp":22},{"minExp":23},{"minExp":24},{"minExp":25},{"minExp":26},{"minExp":27},{"minExp":28},{"minExp":29},{"minExp":30},
  {"minExp":31},{"minExp":32},{"minExp":33},{"minExp":34},{"minExp":35},{"minExp":36},{"minExp":37},{"minExp":38},{"minExp":39},{"minExp":40},
  {"minExp":41},{"minExp":42},{"minExp":43},{"minExp":44},{"minExp":45},{"minExp":46},{"minExp":47},{"minExp":48},{"minExp":49},{"minExp":50},
  {"minExp":51},{"minExp":52},{"minExp":53},{"minExp":54},{"minExp":55},{"minExp":56},{"minExp":57},{"minExp":58},{"minExp":59},{"minExp":60}]
              
  expMax=[
  {"maxExp":0},{"maxExp":1},{"maxExp":2},{"maxExp":3},{"maxExp":4},{"maxExp":5},{"maxExp":6},{"maxExp":7},{"maxExp":8},{"maxExp":9},{"maxExp":10},
  {"maxExp":11},{"maxExp":12},{"maxExp":13},{"maxExp":14},{"maxExp":15},{"maxExp":16},{"maxExp":17},{"maxExp":18},{"maxExp":19},{"maxExp":20},
  {"maxExp":21},{"maxExp":22},{"maxExp":23},{"maxExp":24},{"maxExp":25},{"maxExp":26},{"maxExp":27},{"maxExp":28},{"maxExp":29},{"maxExp":30}, 
  {"maxExp":31},{"maxExp":32},{"maxExp":33},{"maxExp":34},{"maxExp":35},{"maxExp":36},{"maxExp":37},{"maxExp":38},{"maxExp":39},{"maxExp":40},
  {"maxExp":41},{"maxExp":42},{"maxExp":43},{"maxExp":44},{"maxExp":45},{"maxExp":46},{"maxExp":47},{"maxExp":48},{"maxExp":49},{"maxExp":50},
  {"maxExp":51},{"maxExp":52},{"maxExp":53},{"maxExp":54},{"maxExp":55},{"maxExp":56},{"maxExp":57},{"maxExp":58},{"maxExp":59},{"maxExp":60}]
              
  gender=[{"gender":"Male"},{"gender":"Female"},{"gender":"Transgender"}]     
  jobType=[{"jobType":"Full Time"},{"jobType":"Part Time"},{"jobType":"Temporary"},{"jobType":"Contract"}]

  ngOnInit() {
    this.recruiterModel=new RecruiterModel();
    this.jobInfo=new JobInfo();
    this.jobCtcInfo=new JobCtcInfo();
    this.postedJob=new PostedJobs();
    this.postedJobList=new Array<PostedJobs>();
    this.jobInterviewInfo=new JobInterviewInfo();
    this.postedJob.jobDescription=null;

    this.postedJob.jobInfo=new JobInfo();
    this.postedJob.jobCtcInfo=new JobCtcInfo();
    this.postedJob.jobInterviewInfo=new JobInterviewInfo();

    this.selectedCity=new Array<CityModel>();
    this.selectedSkills=new Array<KeySkillsModel>();
    this.getRecruitrerDetails();
    this.getKeySkills();
    this.getCountries();
    this.getfunctionalArea();
    this.getIndustryList();
    this.getQualification();  
    
  }

  getRecruitrerDetails(){
    this.recruiterService.getRecruiterDetails(localStorage.getItem('email')).subscribe(result=>{
      if(result){
        this.recruiterModel=result;
        this.getJobById();
      }
    });
  }
getJobById(){
  if(this.recruiterModel.reqId!=0){
  this.recruiterService.getJobById(this.recruiterModel.reqId).subscribe((result:any)=>{
     // this.postedJob=result;
    })
  }
}
  getCountries() {
    this.sharedService.getAllCountries().subscribe((countries: Array<CountriesModel>) => {
      this.countryList = countries;
      if(this.countryList){
         if(this.jobId!=0 && Object.keys(this.postedJob).length>0){
         this.selectedcountry=this.countryList.filter(x=>x.name===this.postedJob.jobInfo.country)
         } 
      }
    });
  }

  onCountrySelect(country: any) {
    if(country){
      let id=this.countryList.filter(x=>x.name==country)[0].id;
      this.sharedService.getAllStatesByCountryId(id).subscribe((states: Array<StatesModel>) => {
      this.stateList = states;
      this.postedJob.jobInfo.country= this.countryList.filter(x=>x.name==country)[0].name;
    });
   }
   else{
     this.stateList=[];
     this.cityList=[];
    this.postedJob.jobInfo.state='';
    this.postedJob.jobInfo.city='';
   }
  }
  onStateSelect(state: any) {
    if(state){
      let id=this.stateList.filter(x=>x.name==state)[0].id;
    this.sharedService.getAllCitiesByStateId(id).subscribe((cities: Array<CityModel>) => {
      this.cityList = cities;
      this.postedJob.jobInfo.state= this.stateList.filter(x=>x.name==state)[0].name;
    });
    }
    else{
      this.cityList=[];
      this.postedJob.jobInfo.city='';
    }
  }
 
  onSelectCity(city:any){
    if(city){
    this.postedJob.jobInfo.city=this.cityList.filter(x=>x.name===city)[0].name;
    }
    else{
    }
  }
  getAllCity(){
    this.sharedService.getAllCities().subscribe((result:Array<CityModel>)=>{
      this.cityDropdownList=result;
      if(this.postedJob.jobInfo.city){
        let citylist= this.selectedList(this.postedJob.jobInfo.city)
          citylist.forEach((x:any)=>{
          this.cityDropdownList.forEach(y=>{
            if(x==y.name)
            {
              this.selectedCity.push(y);
            }
          })
        })
      }
      this.selectedcities=this.selectedCity;
    })
  }
  onKeySkillSelect(skill:any){
    if(skill){
      this.jobInfo.keySkills=this.keySkillsDropdownList.filter(x=>x.name==skill)[0].name;
    }
  }

  onSelectRadio(event:any){
    this.postedJob.jobVisibility=event; 
  }
  onMinExpSelect(event:any){
    this.jobCtcInfo.minExp=event;
    this.checkExperience();
  }

  onMaxExpSelect(event:any){
    this.jobCtcInfo.maxExp=event;
    this.checkExperience();
  }

  onFunAreaSelect(event){
    this.jobCtcInfo.functionalArea=event;
  }

  onIndustrySelect(event){
    this.jobCtcInfo.industry=event;
  }

  onGenderSelect(event){
    this.jobCtcInfo.gender=event;
  }

  onOfVacancySelect(event){
    this.postedJob.jobCtcInfo.noOfVaccancy=+event;
  }

  onjobTypeSelect(event){
    this.jobCtcInfo.jobType=event;
  }

  onQualificationSelect(event){
    this.jobCtcInfo.qualification=event;
  }

  selectedList(selectedList:string){
    let selectedlist=[]
    selectedlist=selectedList.split('_')
    return selectedlist;
  }
   

    onItemSelect(item: any) {
      console.log(item);
    }
    onSelectAll(items: any) {
      console.log(items);
    }

    getIndustryList(){
      this.recruiterService.getIndustryList().subscribe((result:Array<IndustryModel>)=>{
        this.industryList=result;
      })
    }
    
    getfunctionalArea(){
      this.recruiterService.getfunctionalAreaList().subscribe((result:Array<FunctionalAreaModel>)=>{
          this.functionalAreaList=result;
      })
    }

    getQualification(){
      this.recruiterService.getQualificationList().subscribe((result:Array<QualificationModel>)=>{
        this.qualificationList=result;
      })
    }
  

    getKeySkills(){
      this.recruiterService.getKeySkills().subscribe((result:Array<KeySkillsModel>)=>{
          this.keySkillsDropdownList=result;
          if(this.postedJob.jobInfo.keySkills){
            let skilllist= this.selectedList(this.postedJob.jobInfo.keySkills)
              skilllist.forEach((x:any)=>{
              this.keySkillsDropdownList.forEach(y=>{
                if(x==y.name)
                {
                  this.selectedSkills.push(y);
                }
              })
            })
          }
          this.selectedskills=this.selectedSkills;
        })
      }
    


  onSubmit(form:NgForm,jobStatus:any){
         if(form.valid){
          if(this.postedJob==undefined ){
            this.postedJob=new PostedJobs();
          } 
        this.postedJob.jobId=this.recruiterModel.reqId;
        //this.postedJob.aboutCompany=this.textEditorComponent.company;
        this.postedJob.jobDescription=this.textEditorComponent.description;
        // this.postedJob.jobInterviewInfo.validUntil=new Date(this.postedJob.jobInterviewInfo.validUntil).toISOString();
        // this.postedJob.jobInterviewInfo.walkinDate=new Date(this.postedJob.jobInterviewInfo.walkinDate).toISOString();
        //this.postedJob.jobPostedDate=new Date().toISOString();
        this.postedJob.jobInterviewInfo.validUntil="";
        this.postedJob.jobInterviewInfo.walkinDate="";
        this.postedJob.jobInterviewInfo.walkinTime="";
        this.postedJob.jobInterviewInfo.contactName="";
        this.postedJob.jobInterviewInfo.contactNo=9789995443;
        this.postedJob.jobPostedDate="2022-09-04";
        this.postedJob.jobVisibility=true;
        //"contactName": "",
        //"contactNo": 9789995443
        //"walkinDate": "",
        //"walkinTime": "",
       // "validUntil": "",
        ///"contactName": "",

        this.postedJob.jobStatus=jobStatus;
        this.postedJobList.push(this.postedJob);
        
      if(jobStatus==1){
        this.recruiterService.jobPostingSave(this.postedJobList,this.recruiterModel.reqId).subscribe((result:any)=>{
          this.toastr.success(result);
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);})
        this.postedJobList=[];
      }else if(jobStatus==2){
        this.recruiterService.updateJob(this.postedJobList,this.recruiterModel.reqId).subscribe((result:any)=>{
          this.toastr.success(result);
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);})
        this.postedJobList=[];
      }else if(jobStatus==3){
        this.recruiterService.publishJob(this.postedJobList,this.recruiterModel.reqId).subscribe((result:any)=>{
          this.toastr.success(result);
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);})
        this.postedJobList=[];
      }
      //this.router.navigate(['/reqem/my-lising/manage-job-post']);
    }
  }
    onReset(){
      this.postedJob=new PostedJobs();
      this.countryname='';
    }

    setDropdownList(name:string){
      let i=0;
      let selectedName='';
      if(name=='city'){
      this.selectedcities.forEach((x)=>{
        if(this.selectedcities.length>1){
          i++;
            if(i!=this.selectedcities.length){
              selectedName+=x.name+'_'
            }
            else{
              selectedName+=x.name
          }
        }
        else{
          selectedName+=x.name;
        }
      })
    }
    if(name=='skill'){
      this.selectedskills.forEach((x)=>{
        if(this.selectedskills.length>1){
          i++;
            if(i!=this.selectedskills.length){
              selectedName+=x.name+'_'
            }
            else{
              selectedName+=x.name
              }
        }
        else{
          selectedName+=x.name;
        }
      })
    }
      return selectedName;
    }
    isExperience:boolean=false;
    checkExperience(){
      if(+this.postedJob.jobCtcInfo.minExp>+this.postedJob.jobCtcInfo.maxExp && this.postedJob.jobCtcInfo.maxExp!=""
      && this.postedJob.jobCtcInfo.minExp!=""){
        this.isExperience=true;
        this.postedJob.jobCtcInfo.minExp='';
        this.postedJob.jobCtcInfo.maxExp='';
      }else if(+this.postedJob.jobCtcInfo.maxExp<+this.postedJob.jobCtcInfo.minExp && this.postedJob.jobCtcInfo.minExp!=""
      && this.postedJob.jobCtcInfo.maxExp!=""){
        this.isExperience=true;
        this.postedJob.jobCtcInfo.minExp='';
        this.postedJob.jobCtcInfo.maxExp='';
      }
      else{
        this.isExperience=false;
      }
    }
}
