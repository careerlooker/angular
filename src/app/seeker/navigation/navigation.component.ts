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
   constructor(private seekerService: SeekerService, private toastr: ToastrService, private router: Router) {
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
    })
  }
  togg(name:string) {
   this.dropdowns[name] = !this.dropdowns[name];
   
   let activeUrl = this.router.url;  
   console.log(activeUrl);
   console.log(activeUrl.indexOf('/my-profile'));
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
       if(result!=null){
        this.profile = result;
        this.email = this.profile.email;
        this.progresBar();
        console.log(this.profile);
       }
      }, (err: HttpErrorResponse) => {
        this.toastr.error(err.message);
        console.log(err);
      })
    }
  }

  count:number=0;
  profileCompletion:number=0;
  progresBar(){
    this.seekerService.jobSeekereMessage.subscribe((result:any)=>{
      this.profile=result;
      this.profileCompletion=0;
      this.count=0;
      if(this.profile.personalInfo!=null){this.count+=1;this.seekerService.tickSubject.next('pi')}
      if(this.profile.profSummary!=null){this.count+=1;this.seekerService.tickSubject.next('ps')}
      if(this.profile.experience!=null){this.count+=1;this.seekerService.tickSubject.next('ex')}
      if(this.profile.education!=null){this.count+=1;this.seekerService.tickSubject.next('ed')}
      if(this.profile.skills!=null){this.count+=1;this.seekerService.tickSubject.next('ss')}
      if(this.profile.awards!=null){this.count+=1;this.seekerService.tickSubject.next('ad')}
      if(this.profile.certification!=null){this.count+=1;this.seekerService.tickSubject.next('ca')}
      if(this.profile.contactDetails!=null){this.count+1;this.seekerService.tickSubject.next('cd')}
      if(this.profile.otherDetails!=null){this.count+=1;this.seekerService.tickSubject.next('od')}
      if(this.profile.language!=null){this.count+=1;this.seekerService.tickSubject.next('lg')}
      if(this.profile.blockCompanies!=null){this.count+=1;this.seekerService.tickSubject.next('pi')}
      if(this.profile.training!=null){this.count+=1;this.seekerService.tickSubject.next('tn')}
      this.profileCompletion=Math.trunc((this.count/12)*100);
    });
     

  }

  change(){
    this.seekerService.jobSeekereMessage.subscribe((reuslt:any)=>{
      this.profileUrl=reuslt;
    })
  }    
}
