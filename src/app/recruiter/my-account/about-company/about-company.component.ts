import { Component, OnInit, ViewChild } from '@angular/core';
import { RecruiterService } from '../../recruiter-services/recruiter.service';
import { ToastrService } from 'ngx-toastr';;
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TextEditorComponent } from '../../../shared/components/text-editor/text-editor.component';
import { BaseModel } from 'src/app/shared/models/base.model';
import { RecruiterModel } from '../models/recruiter.model';
import { CompanyDetail } from '../models/company-detail.model';

@Component({
  selector: 'app-about-company',
  templateUrl: './about-company.component.html',
  styleUrls: ['./about-company.component.css']
})
export class AboutCompanyComponent extends BaseModel implements OnInit {
  imgUrl:any={
    'image':'/assets/img/client/1.png',
    'buttonText':'Upload Company Logo'
  }
  @ViewChild(TextEditorComponent) textEditorComponent: TextEditorComponent;
  recruiterModel:RecruiterModel=new RecruiterModel();
  constructor(private recruiterService:RecruiterService,
              private toastr:ToastrService,
              private router:Router) {super();}

  ngOnInit() {
    this.recruiterModel.companyDetail=new CompanyDetail();
    this.aboutCompany();
    
  }

  aboutCompany(){
    this.email=localStorage.getItem('email');
    if(this.email){
      this.recruiterModel.companyDetail.description=null;
      this.recruiterService.getRecruiterDetails(this.email).subscribe((result: any)=>{
        if(result!=null){
          this.recruiterModel=result;
          }
          this.recruiterService.recruiterSubject.next(this.recruiterModel);
      },(err: HttpErrorResponse) => {
            this.toastr.error(err.message,'Company Info');
          })
    }
  }

 
  onSubmit(form:NgForm){
    this.recruiterModel.companyDetail=new CompanyDetail();
    this.recruiterModel.companyDetail.description=this.textEditorComponent.description;
    //this.recruiterModel.companyDetail.companyLogo=this.imgUrl;
    this.recruiterService.updateReqProfile(this.recruiterModel).subscribe((result:any)=>{
      this.toastr.success(JSON.parse(result).message,'Company Info');
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message,'Company Info');
     })
    }
}
