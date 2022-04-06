import { Component, OnInit, ViewChild } from '@angular/core';
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
import { JobSeekerModel } from 'src/app/seeker/models/job-seeker-model';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent extends BaseModel implements OnInit {
  @ViewChild(TextEditorComponent) textEditorComponent: TextEditorComponent;
  experience:ExperienceModel=new ExperienceModel();
  jobSeekerModel:JobSeekerModel=new JobSeekerModel();

  constructor(private seekerService: SeekerService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private router:Router) { super()}

  ngOnInit() {
    this.jobSeekerModel.experience= new Array<ExperienceModel>();
    this.experience.responsibilities='';
    this.isAdd=true;
    this.isDelete=true;
    this.getExperienceList();
    this.getCountries();
  
     this.actionType='add'
  }

  getExperienceList(){
    this.email=localStorage.getItem('email');
    if (this.email != null) {
      this.seekerService.getExperienceList(this.email).subscribe((result: JobSeekerModel) => {
        if(result!=null){
          this.jobSeekerModel = result;

        if( this.jobSeekerModel.experience.length>0)
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
    if(this.experience.resigningYear!=undefined)
    {
      let joinYear=+this.joiningYear.find(x=>x.joiningYear=year).joiningYear;
      if(joinYear<=+this.experience.resigningYear)
      {
        this.experience.joiningYear=year;
      }
      else{
      this.toastr.error('Joining year should not be greater than resigning year');
      this.experience.joiningYear=null;
    }
  }
  else{
    this.experience.joiningYear=year;
  }
  }
  onResigningYearChange(year){
    if(this.experience.resigningYear!=undefined)
    { 
      let resignYear=+this.resigningYear.find(x=>x.resigningYear==year).resigningYear;
      let joiningYear=+this.experience.joiningYear;
      if(resignYear>=joiningYear)
      {
        this.experience.resigningYear=year;
      }
      else
      {
        this.experience.resigningYear='';
        this.toastr.error('Resigning year should be greater than joining year');
      }
  }
  else{
    this.experience.resigningYear=year;
  }
}

  onPresentCompany(value:any){
   this.experience.presentEmployer=value==true?1:0;
  }

  updateCompany(experience:ExperienceModel){
    this.experience= this.jobSeekerModel.experience.filter(x=>x.expid==experience.expid)[0];
    this.isUpdate = true;
    this.isAdd = false;
    this.actionType='edit';
    this.isDelete=false;
  }


  addNewCompany (form:NgForm){
    if(form.valid){
    this.experience.responsibilities=this.textEditorComponent.description
    this.isAdd=true;
    this.isUpdate=false;
      this.experience.presentEmployer=form.value.presentEmployer==true?1:0;
      this.jobSeekerModel.email=this.email;
       if(this.jobSeekerModel.experience.length>0){
        if(this.jobSeekerModel.experience.filter(x=>x.expid!==this.experience.expid)){
        let maxId = this.jobSeekerModel.experience.reduce((max, character) => (character.expid > max ? character.expid : max),
        this.jobSeekerModel.experience[0].expid);
        this.experience.expid=maxId+1;
        }
       }else{
        this.experience.expid=1;
       }
       this.jobSeekerModel.experience.forEach(x=>{
         if(x.presentEmployer==1 && this.experience.presentEmployer==1){
              this.isChecked=true;
         }
         else{
           this.isChecked=false;
         }
       })
       if(!this.isChecked){
       this.jobSeekerModel.experience.push(this.experience)
       } 
    }
  }
  UpdateCompany(){
    const targetIdx = this.jobSeekerModel.experience.map(item => item.expid).indexOf(this.experience.expid);
    this.experience.responsibilities=this.textEditorComponent.description;
    this.jobSeekerModel.experience[targetIdx] = this.experience;
    this.isDelete=true;
  }
  deleteCompany(experience:ExperienceModel){
    const targetIdx = this.jobSeekerModel.experience.map(item => item.expid).indexOf(experience.expid);
    this.jobSeekerModel.experience.splice(targetIdx,1)
  }
  nextPage(){
    this.seekerService.saveExperience(this.jobSeekerModel, this.actionType).subscribe((result:any)=>{
      if(result){
      this.toastr.success(JSON.parse(result).message);
      this.getExperienceList();
      this.isUpdate = false;
      this.isAdd = true;
      this.experience=new ExperienceModel();
      this.experience.responsibilities='';
        this.router.navigate(['/seeqem/my-profile/education']);
      }
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message);
      console.log(err);
    }) 
  }
}
