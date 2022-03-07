import { Component, OnInit } from '@angular/core';
import { RecruiterService } from '../../recruiter-services/recruiter.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notification:UserModel=new UserModel();
  private email:string;
  credentials:string;
  notificationStatus:boolean=false;
  constructor(private recruiterService:RecruiterService,private toastr:ToastrService) { }

  ngOnInit() {
    this.getNotification();
  }

  getNotification(){
    if(localStorage.getItem('userToken')!=null){
      this.credentials=JSON.parse(localStorage.getItem('credentials'));
      this.recruiterService.recruiterLogin(this.credentials).subscribe((result: UserModel)=>{
        if(result!=null){
          this.notification=result;
          this.email=this.notification.email;
          this.checkNotification();
          console.log(this.notification);
        }
      },(err: HttpErrorResponse) => {
            this.toastr.error(err.message);
            console.log(err);})
    }
  }
   updateNotification(form:NgForm){ 

     this.notification.email=this.email;
     this.notification.notiMatchingProfile=form.value.notiMatchingProfile==true?1:0;
     this.notification.notiAccExpired=form.value.notiAccExpired==true?1:0;
     this.notification.notiJobExpired=form.value.notiJobExpired==true?1:0;
     this.notification.notiJobPosted=form.value.notiJobPosted==true?1:0;
     this.recruiterService.updateReqProfile(this.notification).subscribe((result:any)=>{
       this.getNotification(); 
       this.toastr.success(result);
     },(err: HttpErrorResponse) => {
      this.toastr.error(err.message);
      console.log(err);})
   }

   notificationsStatus(event:any){
    this.notificationStatus=event;
    if(this.notificationStatus==false){
      this.notification.notiMatchingProfile=0;
      this.notification.notiAccExpired=0;
      this.notification.notiJobPosted=0;
      this.notification.notiJobExpired=0;
    }else{
      this.notification.notiMatchingProfile=1;
      this.notification.notiAccExpired=1;
      this.notification.notiJobPosted=1;
      this.notification.notiJobExpired=1;
    }
   }

  notiMatchingProfile(event:any){
     this.notification.notiMatchingProfile=event==true?1:0;
     this.checkNotification()
   }
  notiAccExpired(event:any){
    this.notification.notiAccExpired=event==true?1:0;
    this.checkNotification()
  }
  notiJobPosted(event:any){
    this.notification.notiJobPosted=event==true?1:0;
    this.checkNotification()
  }
  notiJobExpired(event:any){
    this.notification.notiJobExpired=event==true?1:0;
    this.checkNotification();
  }

  checkNotification(){
    if(this.notification.notiMatchingProfile==1 || this.notification.notiAccExpired==1 || this.notification.notiJobExpired==1||this.notification.notiJobPosted==1){
      this.notificationStatus=true;
    }
    else{
      this.notificationStatus=false;
    }
  }
}
