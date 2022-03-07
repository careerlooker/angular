import { Component, OnInit } from '@angular/core';
import { CountriesModel } from 'src/app/shared/models/countries.model';
import { StatesModel } from 'src/app/shared/models/states.model';
import { CityModel } from 'src/app/shared/models/city.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { NgForm } from '@angular/forms';
import { JobPosting } from '../models/job-posting.model';
import { RecruiterService } from '../../recruiter-services/recruiter.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { IndustryModel } from '../models/industry.model';
import { FunctionalAreaModel } from '../models/functional-area.model';
import { QualificationModel } from '../models/qualification.model';
import { KeySkillsModel } from '../models/key-skills.model';
import { Router, ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent implements OnInit {
  jobPosting:JobPosting=new JobPosting();
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
              private router:Router,
              private route: ActivatedRoute) { 
                this.jobId =+this.route.snapshot.queryParamMap.get('id');
                this.dropdownSettings = {
                  singleSelection: false,
                  idField: 'id',
                  textField: 'name',
                  selectAllText: 'Select All',
                  unSelectAllText: 'UnSelect All',
                  itemsShowLimit: 3,
                  allowSearchFilter: true
                };

                this.singleDropdownSettings = {
                  singleSelection: true,
                  idField: 'id',
                  textField: 'name',
                  selectAllText: 'Select All',
                  unSelectAllText: 'UnSelect All',
                  itemsShowLimit: 1,
                  allowSearchFilter: true
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
    this.selectedCity=new Array<CityModel>();
    this.selectedSkills=new Array<KeySkillsModel>();
    this.getJobById();
    this.getKeySkills();
    this.getCountries();
    this.getfunctionalArea();
    this.getIndustryList();
    this.getQualification();  
    
  }
getJobById(){
  if(this.jobId!=0){
  this.recruiterService.getJobById(this.jobId).subscribe((result:JobPosting)=>{
      this.jobPosting=result;
    })
  }
}
  getCountries() {
    this.sharedService.getAllCountries().subscribe((countries: Array<CountriesModel>) => {
      this.countryList = countries;
      if(this.countryList){
         if(this.jobId!=0 && Object.keys(this.jobPosting).length>0){
         this.selectedcountry=this.countryList.filter(x=>x.id===this.jobPosting.countryId)
         }
        this.getAllCity();
      }
    });
  }

  onCountrySelect(name: string) {
    let id = this.countryList.filter(x => x.name === name)[0].id;
    this.jobPosting.countryId=id;
    this.sharedService.getAllStatesByCountryId(id).subscribe((states: Array<StatesModel>) => {
      this.stateList = states;
    });
  }
  onStateSelect(name: string) {
    let id = this.stateList.filter(x => x.name === name)[0].id;
    this.sharedService.getAllCitiesByStateId(id).subscribe((cities: Array<CityModel>) => {
      this.cityList = cities;
    });
  }
 
  onSelectCity(name:string){
   // this.jobPosting.cityId=this.cityList.filter(x=>x.name===name)[0].id;
  }

  onKeySkillSelect(name:string){
      this.jobPosting.keySkill=name;
  }

  onSelectRadio(event:any){
    this.jobPosting.contactVisibility=event; 
  }
  onMinExpSelect(event:any){
    this.jobPosting.expMin=+event;
  }

  onMaxExpSelect(event:any){
    this.jobPosting.expMax=+event;
  }

  onFunAreaSelect(event){
    this.jobPosting.functionArea=event;
  }

  onIndustrySelect(event){
    this.jobPosting.industry=event;
  }

  onGenderSelect(event){
    this.jobPosting.gender=event;
  }

  onOfVacancySelect(event){
    this.jobPosting.noOfVacancies=+event;
  }

  onjobTypeSelect(event){
    this.jobPosting.jobType=event;
  }

  onQualificationSelect(event){
    this.jobPosting.qualification=event;
  }

  selectedList(selectedList:string){
    let selectedlist=[]
    selectedlist=selectedList.split('_')
    return selectedlist;
  }
    getAllCity(){
      this.sharedService.getAllCities().subscribe((result:Array<CityModel>)=>{
        this.cityDropdownList=result;
        if(this.jobPosting.cities){
          let citylist= this.selectedList(this.jobPosting.cities)
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
          if(this.jobPosting.keySkill){
            let skilllist= this.selectedList(this.jobPosting.keySkill)
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
    


  onSubmit(form:JobPosting,jobStatus:any){
          this.jobPosting.cities='';
          this.jobPosting.keySkill='';
          form.jobStatus=jobStatus;
          this.jobPosting=form;
          this.jobPosting.cities=this.setDropdownList('city')
          this.jobPosting.keySkill=this.setDropdownList('skill');
          
       
      this.jobPosting.reqId=+JSON.parse(localStorage.getItem('reqId'));
     
      if(jobStatus==1){
        this.recruiterService.jobPostingSave(this.jobPosting).subscribe((result:any)=>{
          this.toastr.success(result);
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);})
      }else if(jobStatus==2){
        this.recruiterService.updateJob(this.jobPosting).subscribe((result:any)=>{
          this.toastr.success(result);
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);})
      }else if(jobStatus==3){
        this.recruiterService.publishJob(this.jobPosting).subscribe((result:any)=>{
          this.toastr.success(result);
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);})
      }
      this.router.navigate(['/reqem/my-lising/manage-job-post']);
    }

    onReset(){
      this.jobPosting=new JobPosting();
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
}
