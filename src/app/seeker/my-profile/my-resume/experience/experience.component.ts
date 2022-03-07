import { Component, OnInit, ViewChild } from '@angular/core';
import { SeekerModel } from 'src/app/seeker/models/seeker.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CountriesModel } from 'src/app/shared/models/countries.model';
import { StatesModel } from 'src/app/shared/models/states.model';
import { CityModel } from 'src/app/shared/models/city.model';
import { Router } from '@angular/router';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ExperienceModel } from 'src/app/seeker/models/experience.model';
import { NgForm } from '@angular/forms';
import { TextEditorComponent } from 'src/app/shared/components/text-editor/text-editor.component';
import { BaseModel } from 'src/app/shared/models/base.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent extends BaseModel implements OnInit {
  @ViewChild(TextEditorComponent) textEditorComponent: TextEditorComponent;
  experience:ExperienceModel=new ExperienceModel();
  experienceList:Array<ExperienceModel>=new Array<ExperienceModel>();

  constructor(private seekerService: SeekerService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private router:Router) { super()}

  ngOnInit() {
    this.getExperienceList();
    this.getCountries();
  //  this.experience.responsibilities='';
     this.actionType='add'
  }

  getExperienceList(){
    this.email=localStorage.getItem('email');
    if (this.email != null) {
      this.sekId=+localStorage.getItem('seekId');
      this.seekerService.getExperienceList(this.sekId).subscribe((result: Array<ExperienceModel>) => {
        if(result!=null){
        this.experienceList = result;
        if(this.experienceList.length>0)
        this.seekerService.tickSubject.next('ex');
      }
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);
      })
    }
  }

  getCountries() {
    this.sharedService.getAllCountries().subscribe((countries: Array<CountriesModel>) => {
      this.countryList = countries;
      if (Object.keys(this.experience).length > 0 && this.experience.country) {
        this.countryname = this.countryList.filter(x => x.name === this.experience.country)[0].name;
        this.onCountrySelect(this.countryname);
      }
    });
  }

  onCountrySelect(name: string) {
    let id = this.countryList.filter(x => x.name === name)[0].id;
    this.sharedService.getAllStatesByCountryId(id).subscribe((states: Array<StatesModel>) => {
      this.stateList = states;
      if(Object.keys(this.stateList).length>0 && this.experience.state){
        this.statename=this.stateList.filter(x=>x.name===this.experience.state)[0].name
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
      if(Object.keys(this.cityList).length>0 && this.experience.city){
        this.cityname=this.cityList.filter(x=>x.name===this.experience.city)[0].name;
      }else{
        this.cityname='';
      }
    })
  }

  onJoiningMonthChange(month:any){
    this.experience.joiningMonth=month;
  }
  onResigningMonthChange(month){
    this.experience.resigningMonth=month;
  }
  onJoiningYearChange(year){
    this.experience.joiningYear=year;
  }
  onResigningYearChange(year){
    this.experience.resigningYear=year;
  }

  onPresentCompany(value:any){
   // this.experience.presentCompany=value==true?1:0;
  }

  RowSelected(experience:ExperienceModel){
    this.experience=this.experienceList.filter(x=>x.id==experience.id)[0];
    this.isUpdate = true;
    this.isAdd = false;
    this.actionType='edit';
  }

  onSubmit(form:NgForm){
    if(form.valid){
    //  this.experience.responsibilities=this.textEditorComponent.description
      this.experience.sekId=this.sekId;
     // this.experience.presentCompany=form.value.presentCompany==true?1:0;
      let expList=new Array<ExperienceModel>();
      expList.push(this.experience)
      this.seekerService.saveExperience(expList, this.actionType).subscribe((result:any)=>{
        this.toastr.success(JSON.parse(result).message);
        this.getExperienceList();
        this.isUpdate = false;
        this.isAdd = true;
        this.experience=new ExperienceModel();
      //  this.experience.responsibilities='';
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);
        console.log(err);
      }) 
    }
  }
  nextPage(){
    this.router.navigate(['/seeqem/my-profile/education']);
  }
}
