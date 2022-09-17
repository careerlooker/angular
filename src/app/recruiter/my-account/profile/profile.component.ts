import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/recruiter/my-account/models/user.model';
import { RecruiterService } from '../../recruiter-services/recruiter.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { SharedService } from 'src/app/shared/services/shared.service'
import { StatesModel } from 'src/app/shared/models/states.model';
import { CityModel } from 'src/app/shared/models/city.model';
import { CountriesModel } from 'src/app/shared/models/countries.model';
import { RecruiterModel } from '../models/recruiter.model';
import { PersonalInfoComponent } from 'src/app/seeker/my-profile/my-resume/personal-info/personal-info.component';
import { PersonalInformation } from '../models/personal-Information.model';
import { BaseModel } from 'src/app/shared/models/base.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent extends BaseModel implements OnInit {

  userProfile: UserModel = new UserModel();
  recruiterModel:RecruiterModel=new RecruiterModel();
  
  countryList: Array<CountriesModel>;
  stateList: Array<StatesModel>;
  cityList: Array<CityModel>;
  countryname: string;
  statename: string;
  cityname: string;
  imgUrl:any={
    'image':'/assets/img/profile.png',
    'buttonText':'Upload Your Photo'
  }

  constructor(private recruiterService: RecruiterService,
    private toastr: ToastrService,
    private sharedService: SharedService) {
      super();
     }

  ngOnInit(){
    this.recruiterModel.personalInfo=new PersonalInformation();
    this.getProfile();
  }

  getProfile() {
      if (localStorage.getItem('userToken') != null) {
      this.email=localStorage.getItem('email');
      this.recruiterService.getRecruiterDetails(this.email).subscribe((result: any) => {
        if(result!=null){
        this.recruiterModel = result;
        localStorage.setItem('reqId',this.recruiterModel.reqId.toString());
        this.getCountries();
      }
      this.recruiterService.recruiterSubject.next(this.recruiterModel);
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message,'Profile Info');
      })
    }
  }

  getCountries() {
    this.sharedService.getAllCountries().subscribe((countries: Array<CountriesModel>) => {
      this.countryList = countries;
      if (Object.keys(this.countryList).length > 0 && this.recruiterModel.personalInfo!=null) {
        this.recruiterModel.personalInfo.country = this.countryList.filter(x => x.name === this.recruiterModel.personalInfo.country)[0].name;
        this.onCountrySelect(this.recruiterModel.personalInfo.country);
      }
      else{
        this.recruiterModel.personalInfo.country='';
        this.recruiterModel.personalInfo.state='';
        this.recruiterModel.personalInfo.city='';
      }
    });
  }

  onCountrySelect(name: string) {
    if(name!=undefined && name!=null && name!=""){
    let id = this.countryList.filter(x => x.name === name)[0].id;
    this.sharedService.getAllStatesByCountryId(id).subscribe((states: Array<StatesModel>) => {
      this.stateList = states;
      if(Object.keys(this.stateList).length>0 && this.recruiterModel.personalInfo.state!=""){
        this.recruiterModel.personalInfo.state=this.stateList.filter(x=>x.name===this.recruiterModel.personalInfo.state)[0].name
        this.onStateSelect( this.recruiterModel.personalInfo.state);
      }
    });
  }
  else{
    this.recruiterModel.personalInfo.state='';
    this.recruiterModel.personalInfo.city='';
  }
  }
  onStateSelect(name: string) {
    if(name!=undefined && name!=null && name!=""){
    let id = this.stateList.filter(x => x.name === name)[0].id;
    this.sharedService.getAllCitiesByStateId(id).subscribe((cities: Array<CityModel>) => {
      this.cityList = cities;
      if(Object.keys(this.cityList).length>0 && this.recruiterModel.personalInfo.city!=""){
        this.recruiterModel.personalInfo.city=this.cityList.filter(x=>x.name===this.recruiterModel.personalInfo.city)[0].name;
      }
    })
  }
  else{
    this.recruiterModel.personalInfo.city='';
  }
  }
  onSubmit(form: NgForm) {
    if(form.valid){
    this.recruiterModel.personalInfo=new PersonalInformation();
    this.recruiterModel.personalInfo.firstName=form.value.firstName;
    this.recruiterModel.personalInfo.lastName=form.value.lastName;
    this.recruiterModel.personalInfo.companyName=form.value.companyName;
    this.recruiterModel.personalInfo.designation=form.value.designation;
    this.recruiterModel.personalInfo.country=form.value.country;
    this.recruiterModel.personalInfo.state=form.value.state;
    this.recruiterModel.personalInfo.city=form.value.city;
    this.recruiterModel.personalInfo.websiteURL=form.value.websiteURL;
    this.recruiterModel.email=this.email;

    this.recruiterService.updateReqProfile(this.recruiterModel).subscribe((result: any) => {
      this.toastr.success(JSON.parse(result).message,'Profile Info');
      this.getProfile();
    }, (err: HttpErrorResponse) => {
      this.toastr.error(err.message,'Profile Info');
     
    }) 
  }
  else{
    this.toastr.error('Please enter all the mandatory details','Profile Info')
  }
  }
}
