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
    this.education.graduateMonth = "";
   // this.education.graduateYear = "";
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
    let id = this.countryList.filter(x => x.name === name)[0].id;
    this.sharedService.getAllStatesByCountryId(id).subscribe((states: Array<StatesModel>) => {
      this.stateList = states;
      if (Object.keys(this.stateList).length > 0 && this.education.state) {
        this.statename = this.stateList.filter(x => x.name === this.education.state)[0].name
        this.onStateSelect(this.statename);
      } else {
        this.statename = '';
      }
    });
  }

  onStateSelect(name: string) {
    let id = this.stateList.filter(x => x.name === name)[0].id;
    this.sharedService.getAllCitiesByStateId(id).subscribe((cities: Array<CityModel>) => {
      this.cityList = cities;
      if (Object.keys(this.cityList).length > 0 && this.education.city) {
        this.cityname = this.cityList.filter(x => x.name === this.education.city)[0].name;
      } else {
        this.cityname = '';
      }
    })
  }

  onDegreeChange(degree: any) {
    this.education.degree = degree;
  }

  UpdateEducation(){
    const targetIdx = this.jobSeekerModel.education.map(item => item.eduId).indexOf(this.education.eduId);
    this.education.tillDate=this.tillDate;
    this.jobSeekerModel.education[targetIdx] = this.education;
    this.isDelete=true;
  }
  editEducation(education:EducationModel){
    this.education= this.jobSeekerModel.education.filter(x=>x.eduId==education.eduId)[0];
    this.isUpdate = true;
    this.isAdd = false;
    this.actionType='edit';
    this.isDelete=false;
  }
  deleteEducation(education:EducationModel){
    const targetIdx = this.jobSeekerModel.education.map(item => item.eduId).indexOf(education.eduId);
    this.jobSeekerModel.education.splice(targetIdx,1)
  }
  AddEducation(form: NgForm) {
    if (form.valid) {
      this.education.tillDate=form.value.tillDate==true?1:0
      if(this.jobSeekerModel.education.length>0){
        if(this.jobSeekerModel.experience.filter(x=>x.expid!==this.education.eduId)&& this.actionType=='add'){
         let maxId = this.jobSeekerModel.experience.reduce((max, character) => (character.expid > max ? character.expid : max),
         this.jobSeekerModel.education[0].eduId);
        // const ids = this.jobSeekerModel.education.map(object => {
        //   return object.eduId;
        // });
        // const maxIds = Math.max.apply(null,ids);
        this.education.eduId=maxId+1;
        }
       }else{
        this.education.eduId=1;
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
    }
  }

  saveAndNext(){
    this.seekerService.saveEducation(this.jobSeekerModel,this.actionType).subscribe((result: any) => {
      if(result){
        this.toastr.success(JSON.parse(result).message)
        this.education=new EducationModel();
        this.getEducationList();
        this.isUpdate = false;
        this.isAdd = true;
        this.router.navigate(['/seeqem/my-profile/skills']) 
      }
    
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message);
      console.log(err);
    }) 

  }

  getEducationList(){
    this.email=localStorage.getItem('email');
    this.seekerService.getEducationList(this.email).subscribe((result:JobSeekerModel)=>{
      this.jobSeekerModel=result;
      if(this.jobSeekerModel.education.length>0){
      this.seekerService.tickSubject.next('ed');
      }
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message);
      console.log(err);
    }) 
  }
}
