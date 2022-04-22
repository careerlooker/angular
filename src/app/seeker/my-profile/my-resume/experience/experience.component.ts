import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
import { BlockCompanies } from 'src/app/seeker/models/block-companies.model';
import { expressionType } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent extends BaseModel implements OnInit {
  @ViewChild(TextEditorComponent) textEditorComponent: TextEditorComponent;
  experience:ExperienceModel=new ExperienceModel();
  jobSeekerModel:JobSeekerModel=new JobSeekerModel();
  blockCompany:BlockCompanies=new BlockCompanies();
  isCompany:boolean;
  constructor(private seekerService: SeekerService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private router:Router) { super()}

  ngOnInit() {
    this.jobSeekerModel.experience= new Array<ExperienceModel>();
    this.jobSeekerModel.blockCompanies=new Array<BlockCompanies>();
    this.experience.responsibilities='';
    this.isAdd=true;
    this.isDelete=true;
    this.isCompany=true;
    this.getExperienceList();
    this.getCountries();
  
     this.actionType='add'
  }

  getExperienceList(){
    this.email=localStorage.getItem('email');
    if (this.email != null) {
      this.seekerService.getExperienceList(this.email).subscribe((result: any) => {
        this.jobSeekerModel = result;
        if(this.jobSeekerModel.experience){
        this.seekerService.tickSubject.next('ex'); 
        }  
        this.seekerService.jobSeekerSubject.next(this.jobSeekerModel); 
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);
      })
    }
  }

  getCountries() {
    this.sharedService.getAllCountries().subscribe((countries: Array<CountriesModel>) => {
      this.countryList = countries;
      if (Object.keys(this.experience).length > 0 && this.experience.country) {
        this.experience.country = this.countryList.filter(x => x.name === this.experience.country)[0].name;
        this.onCountrySelect(this.experience.country);
      }
    });
  }

  onCountrySelect(name: string) {
    if(name!=null && name!=undefined && name!=""){
    let id = this.countryList.filter(x => x.name === name)[0].id;
    this.sharedService.getAllStatesByCountryId(id).subscribe((states: Array<StatesModel>) => {
      this.stateList = states;
      if(Object.keys(this.stateList).length>0 && this.experience.state){
        this.experience.state=this.stateList.find(x=>x.name===this.experience.state).name
        this.onStateSelect(this.experience.state);
      }else{
        this.experience.state='';
      }
    });
    }else{
      this.experience.country="";
      this.experience.state="";
      this.experience.city="";
    }
  }
  onStateSelect(name: string) {
    if(name!=null && name!=undefined && name!=""){
    let id = this.stateList.find(x => x.name === name).id;
    this.sharedService.getAllCitiesByStateId(id).subscribe((cities: Array<CityModel>) => {
      this.cityList = cities;
      if(Object.keys(this.cityList).length>0 && this.experience.city){
        this.experience.city=this.cityList.find(x=>x.name===this.experience.city).name;
      }else{
        this.experience.city='';
      }
    })
  }else{
    this.experience.city='';
  }
}

  onJoiningMonthChange(month:any){
    this.experience.joiningMonth=month;
    this.checkMonth();
  }
  onResigningMonthChange(month){
    this.experience.resigningMonth=month;
    this.checkMonth();
  }
  onJoiningYearChange(year){
    if(this.experience.resigningYear!=undefined &&  this.experience.joiningYear!="" && this.experience.joiningYear!=null)
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
  this.checkMonth();
}

  onResigningYearChange(year){
    let resignYear=+year;
    if(this.experience.resigningYear!=undefined &&  this.experience.resigningYear!="" && this.experience.resigningYear!=null)
    { 
      let joiningYear=+this.experience.joiningYear;
      if(resignYear>=joiningYear)
      {
        this.experience.resigningYear=resignYear.toString();
      }
      else
      {
        this.experience.resigningYear='';
        this.toastr.error('Resigning year should be greater than joining year');
      }
    }
    else{
    this.experience.resigningYear=resignYear.toString();
    }
    this.checkMonth();
  }
  onPresentCompany(value:any){
   this.experience.presentEmployer=value==true?1:0;
   if(this.experience.presentEmployer){
     this.experience.resigningMonth="";
     this.experience.resigningYear="";
     this.isCompany=false;
   }
   else{
    this.isCompany=true;
   }
  }

  editCompany(experience:ExperienceModel){
    this.experience= this.jobSeekerModel.experience.filter(x=>x.expid==experience.expid)[0];
    this.isUpdate = true;
    this.isAdd = false;
    this.actionType='edit';
    this.isDelete=false;
    if(experience.presentEmployer){
      this.isCompany=false;
    }
    else{
      this.isCompany=true;
    }
    this.getCountries();
  
  }

  checkMonth()
  {
    if(this.experience.joiningYear==this.experience.resigningYear){
      let joinMonth=this.joiningMonth.filter(x=>x.joiningMonth==this.experience.joiningMonth)[0];
      let resignMonth=this.resigningMonth.filter(x=>x.resigningMonth==this.experience.resigningMonth)[0];
      if(joinMonth.Id>resignMonth.Id){
        this.experience.joiningMonth='';
        this.experience.resigningMonth='';
        this.toastr.error("Joining month and Resigning month is not correct");
      }
    }
  }
  checkPresentCompany(){
    if(this.jobSeekerModel.experience){
      this.jobSeekerModel.experience.forEach(x=>{
        if(x.presentEmployer==1 && this.experience.presentEmployer==1){
             this.isChecked=true;
        }
        else{
          this.isChecked=false;
        }
      })
     }else{
       this.jobSeekerModel.experience=[];
     }
     if(this.experience.presentEmployer!=1){
      this.isCompany=true;
       }
  }
  addNewCompany (form:NgForm){
    if(form.valid && this.textEditorComponent.description!="" && this.textEditorComponent.description!=undefined){
    this.experience.responsibilities=this.textEditorComponent.description
    this.isAdd=true;
    this.isUpdate=false;
      this.jobSeekerModel.email=this.email;
       if(this.jobSeekerModel.experience){
        if(this.jobSeekerModel.experience.filter(x=>x.expid!==this.experience.expid)){
        let maxId = this.jobSeekerModel.experience.reduce((max, character) => (character.expid > max ? character.expid : max),
        this.jobSeekerModel.experience[0].expid);
        this.experience.expid=maxId+1;
        }
       }else{
        this.experience.expid=1;
       }
      this.checkPresentCompany();
       if(!this.isChecked){
        this.jobSeekerModel.experience.push(this.experience)
        this.experience=new ExperienceModel();
        this.experience.responsibilities='';
        this.textEditorComponent.description='';
       } 
    }
  }

  replaceStrirng(description:any){
    if(description!=null && description!=undefined){
    let desc=description.replace('<p>',"").replace('</p>',"");
       return desc;
    }
  }

  UpdateCompany(form:NgForm){
    if(form.valid && this.textEditorComponent.description!="" && this.textEditorComponent.description!=undefined){
      this.experience.responsibilities=this.textEditorComponent.description;
    const targetIdx = this.jobSeekerModel.experience.map(item => item.expid).indexOf(this.experience.expid);
    this.onPresentCompany(this.experience.presentEmployer);
    this.jobSeekerModel.experience[targetIdx] = this.experience;
    // this.jobSeekerModel.experience.forEach((x,i)=>{
    //   if(x.expid==this.experience.expid){
    //     x.city=this.experience.city;
    //     x.country=this.experience.country;
    //     x.state=this.experience.state;
    //     x.employerName=this.experience.employerName;
    //     x.joiningMonth=this.experience.joiningMonth;
    //     x.joiningYear=this.experience.joiningYear;
    //     x.presentEmployer=this.experience.presentEmployer;
    //     x.resigningMonth=this.experience.resigningMonth;
    //     x.resigningYear=this.experience.resigningYear;
    //     x.responsibilities=this.experience.responsibilities;
    //     x.role=this.experience.role;
    //   }
    // })
    this.isDelete=false;
    this.experience=new ExperienceModel();
    this.experience.responsibilities='';
    this.textEditorComponent.description='';
    this.isCompany=true;
    }
  }
  deleteCompany(experience:ExperienceModel){
    const targetIdx = this.jobSeekerModel.experience.map(item => item.expid).indexOf(experience.expid);
    this.jobSeekerModel.experience.splice(targetIdx,1)
    if(this.jobSeekerModel.experience.length==0){
      this.jobSeekerModel.experience=null;
    }
  }
  nextPage(){
    this.seekerService.saveExperience(this.jobSeekerModel).subscribe((result:any)=>{
      if(result){
      this.toastr.success(JSON.parse(result).message);
      this.getExperienceList();
      this.isUpdate = false;
      this.isAdd = true;
      this.experience=new ExperienceModel();
      this.experience.responsibilities='';
      if(this.jobSeekerModel.experience.length==0)
      this.jobSeekerModel.experience=null;
      this.router.navigate(['/seeqem/my-profile/education']);
      }
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message);
      console.log(err);
    }) 
  }
}
