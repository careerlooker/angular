import { Component, OnInit } from '@angular/core';
import { RecruiterService } from '../../recruiter-services/recruiter.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BaseModel } from 'src/app/shared/models/base.model';
import { RecruiterModel } from '../models/recruiter.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent extends BaseModel implements OnInit {
  recruiterModel:RecruiterModel=new RecruiterModel();
  constructor(private recruiterService:RecruiterService, 
              private toastr:ToastrService,
              private router:Router) { 
                super();
              }

  ngOnInit() {
    this.getAccount();
  }
  
  getAccount(){
    this.email=localStorage.getItem('email');
    if(this.email!=null && this.email!=""){
      this.recruiterService.getRecruiterDetails(this.email).subscribe((result: any)=>{
        if(result!=null){
          this.recruiterModel=result;
        }
      },(err: HttpErrorResponse) => {
            this.toastr.error(err.message,'Account Info');
      })
    }
  }

  onSubmit(form:NgForm){
    if(form.valid){
       if(form.value.newPwd!=form.value.confirmPwd){
        this.toastr.error('New password and confirm password not matching','Account Info')
        return;
       }

       this.recruiterModel.password=form.value.newPwd;
       this.recruiterModel.newPassword=form.value.newPwd;
       this.recruiterService.updateReqProfile(this.recruiterModel).subscribe((result:any)=>{
         this.toastr.success('Password Updated', 'Account Info');
         this.router.navigateByUrl('/login');
         localStorage.removeItem('userToken');
       },(err: HttpErrorResponse) => {
         this.toastr.error(err.message,'Account Info');
        })
    }
  }
}
