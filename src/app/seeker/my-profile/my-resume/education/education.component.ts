import { Component, OnInit } from '@angular/core';
import { EducationModel } from 'src/app/seeker/models/education.model';
import { RecruiterService } from 'src/app/recruiter/recruiter-services/recruiter.service';
import { QualificationModel } from 'src/app/recruiter/my-listing/models/qualification.model';
import { CountriesModel } from 'src/app/shared/models/countries.model';
import { StatesModel } from 'src/app/shared/models/states.model';
import { CityModel } from 'src/app/shared/models/city.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BaseModel } from 'src/app/shared/models/base.model';
import { JobSeekerModel } from 'src/app/seeker/models/job-seeker-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent extends BaseModel implements OnInit {
  educationList: Array<EducationModel> = new Array<EducationModel>()
  qualificationList: Array<QualificationModel> = new Array<QualificationModel>()
  education: EducationModel = new EducationModel();
  jobSeekerModel:JobSeekerModel=new JobSeekerModel(); 
  tillDate:number;

  constructor(private recruiterService: RecruiterService,
    private sharedService: SharedService,
    private seekerService: SeekerService,
    private toastr: ToastrService,
    private router:Router) { super()}

  ngOnInit() {
    this.jobSeekerModel.education=new Array<EducationModel>();
    this.getQualification();
    this.getCountries();
    this.getEducationList();
    this.actionType='add';
    this.isAdd=true;
    this.isDelete=true;
    this.isSave=true;
  }

  getQualification() {
    this.recruiterService.getQualificationList().subscribe((result: Array<QualificationModel>) => {
      this.qualificationList = result;
    })
  }

  onMonthChange(month: string) {
    this.education.graduateMonth = month;
  }
  onYearChange(year: number) {
    this.education.graduateYear = year;
  }

  onTillDate(value: any) {
   this.tillDate = value == true ? 1 : 0;
  }

  getCountries() {
    this.sharedService.getAllCountries().subscribe((countries: Array<CountriesModel>) => {
      this.countryList = countries;
      if (Object.keys(this.education).length > 0 && this.education.country) {
        this.countryname = this.countryList.filter(x => x.name === this.education.country)[0].name;
        this.onCountrySelect(this.countryname);
      }
    });
  }

  onCountrySelect(name: string) {
    if(name!=null && name!=undefined && name!=""){
    let id = this.countryList.find(x => x.name === name).id;
    this.sharedService.getAllStatesByCountryId(id).subscribe((states: Array<StatesModel>) => {
      this.stateList = states;
      if (Object.keys(this.stateList).length > 0 && this.education.state) {
        this.education.state = this.stateList.find(x => x.name === this.education.state).name
        this.onStateSelect(this.education.state);
      } else {
        this.education.state = '';
      }
    });
  }else{
    this.education.country="";
    this.education.state="";
    this.education.city="";
  }
  }

  onStateSelect(name: string) {
    if(name!=null && name!=undefined && name!=""){
    let id = this.stateList.find(x => x.name === name).id;
    this.sharedService.getAllCitiesByStateId(id).subscribe((cities: Array<CityModel>) => {
      this.cityList = cities;
      if (Object.keys(this.cityList).length > 0 && this.education.city) {
        this.education.city = this.cityList.find(x => x.name === this.education.city).name;
      } else {
        this.education.city = '';
      }
    })
  }
  else{
    this.education.city='';
  }
  }

  onDegreeChange(degree: any) {
    this.education.degree = degree;
  }

  UpdateEducation(form:NgForm){
    if(form.valid){
    const targetIdx = this.jobSeekerModel.education.map(item => item.eduId).indexOf(this.education.eduId);
    this.education.tillDate=this.tillDate;
    this.jobSeekerModel.education[targetIdx] = this.education;
    this.isDelete=false;
    this.isAdd=false;
    this.isUpdate=false;
    this.isSave=true;
    this.education=new EducationModel();
    }
  }
  editEducation(education:EducationModel){
    this.education= this.jobSeekerModel.education.filter(x=>x.eduId==education.eduId)[0];
    this.isUpdate = true;
    this.isAdd = false;
    this.actionType='edit';
    this.isDelete=false;
    this.isSave=false;
    this.getCountries();
  }
  deleteEducation(education:EducationModel){
    const targetIdx = this.jobSeekerModel.education.map(item => item.eduId).indexOf(education.eduId);
    this.jobSeekerModel.education.splice(targetIdx,1)
    if(this.jobSeekerModel.education.length==0){
      this.jobSeekerModel.education=null;
    }
  }
  AddEducation(form: NgForm) {
    if (form.valid) {
      this.education.tillDate=form.value.tillDate==true?1:0
      if(this.jobSeekerModel.education){
        if(this.jobSeekerModel.experience.filter(x=>x.expid!==this.education.eduId)&& this.actionType=='add'){
         let maxId = this.jobSeekerModel.experience.reduce((max, character) => (character.expid > max ? character.expid : max),
         this.jobSeekerModel.education[0].eduId);
          this.education.eduId=maxId+1;
        }
       }else{
        this.education.eduId=1;
        this.jobSeekerModel.education=[];
       }
      //  this.jobSeekerModel.education.forEach(x=>{
      //    if(x.tillDate==1 && this.education.tillDate==1){
      //         this.isChecked=true;
      //    }
      //    else{
      //      this.isChecked=false;
      //    }
      //  })
      //  if(!this.isChecked){
      //  this.jobSeekerModel.education.push(this.education)
      //  } 
      this.jobSeekerModel.education.push(this.education)
      this.education=new EducationModel();
    }
  }

  saveAndNext(){
    this.seekerService.saveEducation(this.jobSeekerModel).subscribe((result: any) => {
      if(result){
        this.toastr.success(JSON.parse(result).message,'Education Info')
        this.education=new EducationModel();
        this.getEducationList();
        this.isUpdate = false;
        this.isAdd = true;
        this.isDelete=true;
      }
    
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message, 'Education Info');
    }) 
  }

 
  getEducationList(){
    this.email=localStorage.getItem('email');
    this.seekerService.getEducationList(this.email).subscribe((result:JobSeekerModel)=>{
      this.jobSeekerModel=result;
      if(this.jobSeekerModel.education){
      this.seekerService.tickSubject.next('ed');
      this.jobSeekerModel.education.sort((a,b)=>+b.graduateYear-+a.graduateYear)
      }
      this.seekerService.updatePersonalInfoMessage(this.jobSeekerModel);
      this.sharedService.updateApprovalMessage(environment.baseUrl+ this.jobSeekerModel.personalInfo.photo);
          
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message,'Education Info');
    }) 
  }
  next(){
    this.router.navigate(['/seeqem/my-profile/skills']) 
  }
  back(){
    this.router.navigate(['/seeqem/my-profile/experience']);
  }
}
