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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  credentials:string;
  userProfile: UserModel = new UserModel();
  email: string;
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
    private sharedService: SharedService) { }

  ngOnInit(){
    this.getProfile();
  }

  getProfile() {
      if (localStorage.getItem('userToken') != null) {
      this.credentials=JSON.parse(localStorage.getItem('credentials'));
      this.recruiterService.recruiterLogin(this.credentials).subscribe((result: UserModel) => {
        if(result!=null){
        this.userProfile = result;
        this.email = this.userProfile.email;
        localStorage.setItem('reqId', this.userProfile.id.toString())
        this.getCountries();
      }
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);
      })
    }
  }

  getCountries() {
    this.sharedService.getAllCountries().subscribe((countries: Array<CountriesModel>) => {
      this.countryList = countries;
      if (Object.keys(this.userProfile).length > 0 && this.userProfile.countryId!=0) {
        this.countryname = this.countryList.filter(x => x.id === this.userProfile.countryId)[0].name;
        this.onCountrySelect(this.countryname);
      }
    });
  }

  onCountrySelect(name: string) {
    let id = this.countryList.filter(x => x.name === name)[0].id;
    this.sharedService.getAllStatesByCountryId(id).subscribe((states: Array<StatesModel>) => {
      this.stateList = states;
      if(Object.keys(this.stateList).length>0 && this.userProfile.stateId!=0){
        this.statename=this.stateList.filter(x=>x.id===this.userProfile.stateId)[0].name
        this.onStateSelect(this.statename);
      }else{
        this.statename='';
      }
    });
  }
  onStateSelect(name: string) {
    let id = this.stateList.filter(x => x.name === name)[0].id;
    this.sharedService.getAllCitiesByStateId(id).subscribe((cities: Array<CityModel>) => {
      this.cityList = cities;
      if(Object.keys(this.cityList).length>0 && this.userProfile.cityId!=0){
        this.cityname=this.cityList.filter(x=>x.id===this.userProfile.cityId)[0].name;
      }else{
        this.cityname='';
      }
    })
  }
  onSubmit(form: NgForm) {
    this.userProfile = new UserModel();
    this.userProfile.firstName = form.value.firstName;
    this.userProfile.lastName = form.value.lastName;
    this.userProfile.companyName = form.value.companyName;
    this.userProfile.designation = form.value.designation;
    this.userProfile.countryId =this.countryList.filter(x=>x.name===form.value.country)[0].id;
    this.userProfile.stateId=this.stateList.filter(x=>x.name===form.value.state)[0].id;
    this.userProfile.cityId = this.cityList.filter(x=>x.name===form.value.city)[0].id;;
    this.userProfile.websiteUrl = form.value.websiteUrl;
    this.userProfile.email = this.email;
    this.recruiterService.updateReqProfile(this.userProfile).subscribe((result: any) => {
      this.toastr.success(result);
    }, (err: HttpErrorResponse) => {
      this.toastr.error(err.message);
      console.log(err);
    }) 
  }
}
