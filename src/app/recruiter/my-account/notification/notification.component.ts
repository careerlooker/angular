import { Component, OnInit } from '@angular/core';
import { RecruiterService } from '../../recruiter-services/recruiter.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { BaseModel } from 'src/app/shared/models/base.model';
import { RecruiterModel } from '../models/recruiter.model';
import { Notification } from '../models/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent extends BaseModel implements OnInit {
  recruiterModel:RecruiterModel=new RecruiterModel();
  constructor(private recruiterService:RecruiterService,private toastr:ToastrService) { 
    super();
  }

  ngOnInit() {
    this.recruiterModel.notification=new Notification();
    this.getNotification();
  }

  getNotification(){
    this.email=localStorage.getItem('email');
    if(this.email){
      this.recruiterService.getRecruiterDetails(this.email).subscribe((result: any)=>{
        if(result!=null){
          this.recruiterModel=result;
          this.checkNotification();
        }
      },(err: HttpErrorResponse) => {
            this.toastr.error(err.message,'Notification Info');
            console.log(err);})
    }
  }
   updateNotification(form:NgForm){ 
     this.recruiterService.updateReqProfile(this.recruiterModel).subscribe((result:any)=>{
       this.getNotification(); 
       this.toastr.success(JSON.parse(result).message,'Notification Info');
     },(err: HttpErrorResponse) => {
      this.toastr.error(err.message,'Notification Info');
      })
   }

   notificationsStatus(event:any){
   this.recruiterModel.notification.emailNotificationAlert=event;
    if(this.recruiterModel.notification.emailNotificationAlert==false){
      this.recruiterModel.notification.foundSameProfileAlert=false;
      this.recruiterModel.notification.myAccountExpiredAlert=false;
      this.recruiterModel.notification.postedJobAlert=false;
      this.recruiterModel.notification.postedJobExpiredAlert=false;
     }else{
      this.recruiterModel.notification.foundSameProfileAlert=true;
      this.recruiterModel.notification.myAccountExpiredAlert=true;
      this.recruiterModel.notification.postedJobAlert=true;
      this.recruiterModel.notification.postedJobExpiredAlert=true;
    }
  }

   notiMatchingProfile(event:any){
    this.recruiterModel.notification.foundSameProfileAlert=event;
      this.checkNotification()
   }
   notiAccExpired(event:any){
    this.recruiterModel.notification.myAccountExpiredAlert=event;
     this.checkNotification()
   }
   notiJobPosted(event:any){
    this.recruiterModel.notification.postedJobAlert=event;
     this.checkNotification()
   }
   notiJobExpired(event:any){
     this.recruiterModel.notification.postedJobExpiredAlert=event;
     this.checkNotification();
   }

   checkNotification(){
     if(this.recruiterModel.notification.foundSameProfileAlert==true || this.recruiterModel.notification.myAccountExpiredAlert==true || 
      this.recruiterModel.notification.postedJobExpiredAlert==true||this.recruiterModel.notification.postedJobAlert==true){
       this.recruiterModel.notification.emailNotificationAlert=true;
     }
     else{
      this.recruiterModel.notification.emailNotificationAlert=false;
     }
   }
}
