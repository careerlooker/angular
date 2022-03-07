import { Component, OnInit } from '@angular/core';
import { RecruiterService } from '../../recruiter-services/recruiter.service';
import { UserModel } from '../models/user.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdateAccountModel } from '../models/update-account.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
   userAccount:UserModel=new UserModel();
   private email:string;
   updateAccount:UpdateAccountModel=new UpdateAccountModel();
  constructor(private recruiterService:RecruiterService, 
              private toastr:ToastrService,
              private router:Router) { }

  ngOnInit() {
    this.getAccount();
  }
  
  getAccount(){
    if(localStorage.getItem('userToken')!=null){
      this.recruiterService.recruiterLogin(JSON.parse(localStorage.getItem('credentials'))).subscribe((result: UserModel)=>{
        if(result!=null){
          this.userAccount=result;
          this.email=this.userAccount.email;
            console.log(this.userAccount);
        }
      },(err: HttpErrorResponse) => {
            this.toastr.error(err.message);
            console.log(err);})
    }
  }

  onSubmit(form:NgForm){
   this.updateAccount.currentPwd=form.value.currentPwd;
   this.updateAccount.newPwd=form.value.newPwd;
   this.updateAccount.confirmPwd=form.value.confirmPwd;
   
   if(this.updateAccount.currentPwd== undefined || this.updateAccount.newPwd==undefined || this.updateAccount.currentPwd==undefined){
    this.toastr.error('Please fill all mandatory fields')
    return;
   }

   if(this.updateAccount.currentPwd!=this.userAccount.password){
    this.toastr.error('Current password is invalid')
    return;
   }
   if(this.updateAccount.newPwd!=this.updateAccount.confirmPwd){
    this.toastr.error('New password and confirm password not matching')
    return;
   }
    this.userAccount.password=this.updateAccount.newPwd;
    this.userAccount.email=this.email;
    this.recruiterService.updateReqProfile(this.userAccount).subscribe((result:any)=>{
      this.toastr.success('Password Updated');
      this.router.navigateByUrl('/login');
      localStorage.removeItem('userToken');
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message);
      console.log(err);})
  }
}
