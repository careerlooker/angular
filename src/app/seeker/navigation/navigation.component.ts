import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PersonalInfo } from '../models/personal-info.model';
import { SeekerService } from '../seeker-services/seeker.service';
import { Router } from '@angular/router';
import { JobSeekerModel } from '../models/job-seeker-model';
import { professionalSummary } from '../models/professional-summary';
import { OthersDetails } from '../models/others-details.model';
import { SkillsModel } from '../models/skills.model';
import { TrainingModel } from '../models/training.model';
import { LanguageModel } from '../models/language.model';
import { EducationModel } from '../models/education.model';
import { ContactDetailsModel } from '../models/contact-details.model';
import { BlockCompanies } from '../models/block-companies.model';
import { AwardsModel } from '../models/awards.model';
import { CertificateModel } from '../models/certificate.model';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-seeker-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class SeekerNavigationComponent   {
  display: string = 'none';
  profile: JobSeekerModel = new JobSeekerModel();
  private email: string;
  credentials:string;
  progressBar:number=10;
  profileUrl='./assets/img/job-seeker.png';
  isProfileMainPage:boolean = false;
  showprofilemenu:boolean;
  count:number=0;
  profileCompletion:number=0;
  barPercentage=0;
  dropdowns = {
    "besics": false,
    "images": false,
    "forms": false, 
    "service": false,
   }
   pi: boolean=false;
   ps: boolean=false;
   ed: boolean=false;
   ex: boolean=false;
   ss: boolean=false;
   tn: boolean=false;
   ca: boolean=false;
   lg: boolean=false;
   cd: boolean=false;
   od: boolean=false;
   rd: boolean=false;
   ad: boolean=false;
   bc:boolean=false;
   constructor(private seekerService: SeekerService, 
               private toastr: ToastrService, 
               private router: Router,
               private sharedService:SharedService) {
     this.profile.personalInfo=new PersonalInfo();
      if(this.router.url == '/seeqem/matching-job'){
        this.isProfileMainPage = true;
      }else{
        this.isProfileMainPage = false;
      }

      let activeUrl = this.router.url;  
      console.log(activeUrl);
      console.log(activeUrl.indexOf('/my-profile'));
      if(activeUrl.indexOf('/my-profile') == -1){
        this.showprofilemenu =  false;
      }else{
        this.showprofilemenu =  true;
      }
    }

  ngOnInit() {
    this.profile.personalInfo=new PersonalInfo();
    this.profile.awards=new Array<AwardsModel>();
    this.profile.blockCompanies=new Array<BlockCompanies>();
    this.profile.certification=new Array<CertificateModel>();
    this.profile.contactDetails=new Array<ContactDetailsModel>();
    this.profile.education=new Array<EducationModel>();
    this.profile.language=new Array<LanguageModel>();
    this.profile.training=new Array<TrainingModel>();
    this.profile.skills=new Array<SkillsModel>();
    this.profile.otherDetails=new OthersDetails();
    this.profile.profSummary=new professionalSummary();
    this.leftProfile();
    this.change();
    this.tickStatus();
  }

  tickStatus(){
    this.seekerService.tickMessage.subscribe((result:any)=>{
     if(result=='pi'){this.pi=true;}
     if(result=='ps'){this.ps=true;}
     if(result=='ed'){this.ed=true;}
     if(result=='ex'){this.ex=true;}
     if(result=='ss'){this.ss=true;}
     if(result=='tn'){this.tn=true;}
     if(result=='ca'){this.ca=true;}
     if(result=='lg'){this.lg=true;}
     if(result=='cd'){this.cd=true;}
     if(result=='od'){this.od=true;}
     if(result=='rd'){this.rd=true;}
     if(result=='ad'){this.ad=true;}
     if(result=='bc'){this.bc=true;}
    })
  }
  togg(name:string) {
   this.dropdowns[name] = !this.dropdowns[name];
   let activeUrl = this.router.url;  
   if(activeUrl.indexOf('/my-profile') == -1){
     this.showprofilemenu =  false;
   }else{
     this.showprofilemenu =  true;
   }
}

showMenu(){
  this.showprofilemenu = !this.showprofilemenu;
}

  leftProfile() {
    if (localStorage.getItem('userToken') != null) {
      this.email=localStorage.getItem('email');
      this.seekerService.seekerLogin(this.email).subscribe((result: JobSeekerModel) => {
       if(Object.keys(result).length>0){
        this.profile = result;
        if(this.profile.personalInfo.photo){
          this.profileUrl=environment.baseUrl+this.profile.personalInfo.photo
        }
        this.email = this.profile.email;
        this.progresBar();
        console.log(this.profile);
       }
      }, (err: HttpErrorResponse) => {
        this.toastr.error(err.message);
      })
    }
  }

 
  progresBar(){
    this.seekerService.PersonalInfoMessage.subscribe((result:any)=>{
      if(Object.keys(result).length>0){
      this.profile=result;
      this.getRole();
      this.profileCompletion=0;
      this.count=0;
      if(this.profile.personalInfo!=null){
        this.count+=1;
        this.seekerService.tickSubject.next('pi')
      }
      else if(this.profile.personalInfo==null){
        this.pi=false;
      }
      if(this.profile.profSummary!=null){
        this.count+=1;
        this.seekerService.tickSubject.next('ps')
      }
      else if(this.profile.profSummary==null){
        this.ps=false;
      }
      if(this.profile.experience!=null){
        this.count+=1;
        this.seekerService.tickSubject.next('ex')
      }
      else if(this.profile.experience==null){
        this.ex=false;
      }
      if(this.profile.education!=null){
        this.count+=1;
        this.seekerService.tickSubject.next('ed')
      }
      else if(this.profile.education==null){
        this.ed=false;
      }
      if(this.profile.skills!=null){
        this.count+=1;
        this.seekerService.tickSubject.next('ss')
      }
      else if(this.profile.skills==null){
        this.ss=false;
      }
      if(this.profile.awards!=null){
        this.count+=1;
        this.seekerService.tickSubject.next('ad')
      }
      else if(this.profile.awards==null){
        this.ad=false;
      }
      if(this.profile.certification!=null){
        this.count+=1;
        this.seekerService.tickSubject.next('ca')
      }
      else if(this.profile.certification==null){
        this.ca=false;
      }
      if(this.profile.contactDetails!=null){
        this.count+=1;
        this.seekerService.tickSubject.next('cd')
      }
      else if(this.profile.contactDetails==null){
        this.cd=false;
      }
      if(this.profile.otherDetails!=null){
        this.count+=1;this.seekerService.tickSubject.next('od')
      }
      else if(this.profile.otherDetails==null){
        this.od=false;
      }
      if(this.profile.language!=null){
        this.count+=1;
        this.seekerService.tickSubject.next('lg')
      }
      else if(this.profile.language==null){
        this.lg=false;
      }
      if(this.profile.training!=null){
        this.count+=1;
        this.seekerService.tickSubject.next('tn')
      }
      else if(this.profile.training==null){
        this.tn=false;
      }
      if(this.profile.resume!=null){ 
       // this.count+=1; 
        this.seekerService.tickSubject.next('rd')
      }
      else if(this.profile.resume==null){
        this.rd=false;
      }
      this.profileCompletion=Math.trunc((this.count/11)*100);
      if(this.profileCompletion==100){
       this.barPercentage= this.profileCompletion+12;
      }
      else
      {
        this.barPercentage=this.profileCompletion;
      }
    }
    });
  }
  change(){
    this.sharedService.currentApprovalStageMessage.subscribe((result:any)=>{
      if(Object.keys(result).length>0){
             this.profileUrl=result;
        }
    })
  }  
  role:string;
  company:string;
  getRole(){
    if(this.profile.experience.length>0){
    this.profile.experience.forEach((e,i)=>{
      if(e.presentEmployer){
        this.role=this.profile.experience.filter(x=>x.presentEmployer==e.presentEmployer)[0].role;
        this.company=this.profile.experience.filter(x=>x.presentEmployer==e.presentEmployer)[0].employerName;
      }
    })
  }
  }
  
}
