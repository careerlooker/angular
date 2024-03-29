import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SignupModel } from '../models/signup.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdateAccountModel } from '../recruiter/my-account/models/update-account.model';
import { JobSeekerModel } from '../seeker/models/job-seeker-model';
import { PersonalInfo } from '../seeker/models/personal-info.model';
import { RecruiterModel } from '../recruiter/my-account/models/recruiter.model';
import { PersonalInformation } from '../recruiter/my-account/models/personal-Information.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],


})
export class SignupComponent implements OnInit {
  signupModel: SignupModel = new SignupModel();
  registerType: string;
  jobSeekerModel:JobSeekerModel=new JobSeekerModel();
  recruiterModel:RecruiterModel=new RecruiterModel()
  validatePwd:UpdateAccountModel=new UpdateAccountModel();
  constructor(private signupService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  handleChange(registerType: string) {
    this.registerType = registerType;
  }

  onSubmit(form: NgForm) {
    if (this.registerType == undefined) {
      this.toastr.error('Please select registration type');
      return
    }
    if (form.valid && this.registerType != undefined) {
      this.signupModel = new SignupModel();
      this.signupModel.firstName = form.value.FirstName;
      this.signupModel.lastName = form.value.LastName;
      this.signupModel.email = form.value.Email;
      this.signupModel.phoneNumber = +form.value.PhoneNumber;
      this.signupModel.password = form.value.Password;
      this.signupModel.confirmPassword=form.value.confirmPassword;

      if(this.signupModel.password!=this.signupModel.confirmPassword){
        this.toastr.error('Passowrd and confirm password not matching');
        return;
      }
        
       this.signUp(this.signupModel)
      //if(this.registerType=='seeker'){
      // this.jobSeekerModel.email= this.signupModel.email;
      // this.jobSeekerModel.password=this.signupModel.password;
      // this.jobSeekerModel.personalInfo=new PersonalInfo();
      // this.jobSeekerModel.personalInfo.firstName=this.signupModel.firstName;
      // this.jobSeekerModel.personalInfo.lastName=this.signupModel.lastName;
      // this.jobSeekerModel.personalInfo.phoneNo=this.signupModel.phoneNumber;
      // this.signUp(this.jobSeekerModel)
     // }
     // else{
        // this.recruiterModel.email=this.signupModel.email;
        // this.recruiterModel.password=this.signupModel.password;
        // this.recruiterModel.personalInfo=new PersonalInformation();
        // this.recruiterModel.personalInfo.firstName=this.signupModel.firstName;
        // this.recruiterModel.personalInfo.lastName=this.signupModel.lastName;
        // this.recruiterModel.personalInfo.phoneNo=this.signupModel.phoneNumber;
        // this.signUp(this.recruiterModel)
     // }    
    }
    else {
      this.toastr.error('Please enter all madatory details');
    }
  }

  signUp(signUpModel:any){
    this.signupService.signUp(signUpModel,this.registerType).subscribe((result: any) => {
      this.toastr.success(JSON.parse(result).message);
       if(this.registerType=='seeker'){
        this.router.navigate(['seeqem']);
       }
       else{
        this.router.navigate(['seeqem']);
       }
    }, (err: HttpErrorResponse) => {
      this.toastr.error(JSON.parse(err.error).message);
    });
  }
}
