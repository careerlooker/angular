import { Component, OnInit, ViewChild } from '@angular/core';
import { RecruiterService } from '../../recruiter-services/recruiter.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../models/user.model';
import { NgForm } from '@angular/forms';
import { Router, NavigationStart } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TextEditorComponent } from '../../../shared/components/text-editor/text-editor.component';

@Component({
  selector: 'app-about-company',
  templateUrl: './about-company.component.html',
  styleUrls: ['./about-company.component.css']
})
export class AboutCompanyComponent implements OnInit {
  companyDetails:UserModel=new UserModel();
  email:string;
  imgUrl:any={
    'image':'/assets/img/client/1.png',
    'buttonText':'Upload Company Logo'
  }
  @ViewChild(TextEditorComponent) textEditorComponent: TextEditorComponent;
  constructor(private recruiterService:RecruiterService,
              private toastr:ToastrService,
              private router:Router) {}

  ngOnInit() {
    this.aboutCompany();
    
  }

  aboutCompany(){
    if(localStorage.getItem('userToken')!=null){
      this.recruiterService.recruiterLogin(JSON.parse(localStorage.getItem('credentials'))).subscribe((result: UserModel)=>{
        if(result!=null){
          this.companyDetails=result;
          this.email=this.companyDetails.email;
            console.log(this.companyDetails);
          }
      },(err: HttpErrorResponse) => {
            this.toastr.error(err.message);
            console.log(err);})
    }
  }

 
  onSubmit(form:NgForm){
    this.companyDetails.aboutCompany=this.textEditorComponent.description
    this.companyDetails.email=this.email;
    this.recruiterService.updateReqProfile(this.companyDetails).subscribe((result:any)=>{
      this.toastr.success(result);
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message);
      console.log(err);})
    }
}
