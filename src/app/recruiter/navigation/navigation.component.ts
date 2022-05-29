import { Component, OnInit } from '@angular/core';
import { RecruiterService } from '../recruiter-services/recruiter.service';
import { UserModel } from '../my-account/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { RecruiterModel } from '../my-account/models/recruiter.model';

@Component({
  selector: 'app-recruiter-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class RecruiterNavigationComponent implements OnInit {
  display: string = 'none';
  profile: UserModel = new UserModel();
  recruiterModel:RecruiterModel=new RecruiterModel();
  private email: string;
  credentials:string;
  progressBar:number=10;
  profileUrl='./assets/img/job-seeker.png'
  constructor(private recruiterService: RecruiterService, private toastr: ToastrService) { }

  ngOnInit() {
    this.leftProfile();
    this.change();
    this.profileMessage();
  }
 

  leftProfile() {
    if (localStorage.getItem('userToken') != null) {
      this.credentials=JSON.parse(localStorage.getItem('credentials'));
      this.recruiterService.recruiterLogin(this.credentials).subscribe((result: UserModel) => {
       if(result!=null){
        this.profile = result;
        this.email = this.profile.email;
       }
      }, (err: HttpErrorResponse) => {
        this.toastr.error(err.message);
        console.log(err);
      })
    }
  }

  openModal() {
    this.display = 'block';
  }

  onCloseHandled() {
    this.display = 'none';
  }

  onSubmit(form:NgForm){
      this.profile.firstName=form.value.firstName;
      this.profile.lastName=form.value.lastName;
      this.profile.companyName=form.value.companyName;
      this.profile.email=this.email;
      this.recruiterService.updateReqProfile(this.profile).subscribe((result:any)=>{
        this.toastr.success(result);
        this.leftProfile();
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);
        console.log(err);
      })
  }

  change(){
    this.recruiterService.profileMessage.subscribe((reuslt:any)=>{
      this.profileUrl=reuslt;
    })
  }

  profileMessage(){
    this.recruiterService.recruiterMessage.subscribe((result:any)=>{
      this.recruiterModel=result;
      if(this.recruiterModel){
      this.profile.profileCompletion= this.recruiterModel.personalInfo.profileCompletion
      this.profile.email=this.recruiterModel.email;
      this.profile.phoneNumber=this.recruiterModel.personalInfo.phoneNo;
      }
    });
  }
}
