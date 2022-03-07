import { Component, OnInit } from '@angular/core';
import { SocialNetworkModel } from '../models/social-network.model';
import { RecruiterService } from '../../recruiter-services/recruiter.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { UserModel } from '../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.css']
})
export class SocialNetworksComponent implements OnInit {
  socialNetwork:UserModel=new UserModel();
  private email:string;
  credentials:string;
  constructor(private recruiterService:RecruiterService,private toastr:ToastrService) { }

  ngOnInit() {
    this.getSocialNetwork();
  }

  getSocialNetwork(){
    if(localStorage.getItem('userToken')!=null){
      this.credentials=JSON.parse(localStorage.getItem('credentials'));
      this.recruiterService.recruiterLogin(this.credentials).subscribe((result: UserModel)=>{
        if(result!=null){
          this.socialNetwork=result;
          this.email=this.socialNetwork.email;
          console.log(this.socialNetwork);
        }
      },(err: HttpErrorResponse) => {
            this.toastr.error(err.message);
            console.log(err);})
    }
  }
   updateSocialNetwork(form:NgForm){
     this.socialNetwork.googlePlus=form.value.google;
     this.socialNetwork.linkedIn=form.value.linkedin;
     this.socialNetwork.facebook=form.value.facebook;
     this.socialNetwork.email=this.email;
     this.recruiterService.updateReqProfile(this.socialNetwork).subscribe((result:any)=>{
       this.getSocialNetwork(); 
       this.toastr.success(result);
     },(err: HttpErrorResponse) => {
      this.toastr.error(err.message);
      console.log(err);})
   }
}
