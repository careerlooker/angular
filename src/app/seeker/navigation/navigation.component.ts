import { Component, OnInit, Input } from '@angular/core';
// import { RecruiterService } from '../recruiter-services/recruiter.service';
// import { UserModel } from '../my-account/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { SeekerModel } from '../models/seeker.model';
import { SeekerService } from '../seeker-services/seeker.service';
import { Router } from '@angular/router';
import { JobSeekerModel } from '../models/job-seeker-model';

@Component({
  selector: 'app-seeker-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class SeekerNavigationComponent  {
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
        console.log(this.profile);
       }
      }, (err: HttpErrorResponse) => {
        this.toastr.error(err.message);
        console.log(err);
      })
    }
  }

  // openModal() {
  //   this.display = 'block';
  // }

  // onCloseHandled() {
  //   this.display = 'none';
  // }

  // onSubmit(form:NgForm){
  //     this.profile.firstName=form.value.firstName;
  //     this.profile.lastName=form.value.lastName;
  //     this.profile.companyName=form.value.companyName;
  //     this.profile.email=this.email;
  //     this.recruiterService.updateReqProfile(this.profile).subscribe((result:any)=>{
  //       this.toastr.success(result);
  //       this.leftProfile();
  //     },(err: HttpErrorResponse) => {
  //       this.toastr.error(err.message);
  //       console.log(err);
  //     })
  // }

  change(){
    this.seekerService.profileMessage.subscribe((reuslt:any)=>{
      this.profileUrl=reuslt;
    })
  }
}
