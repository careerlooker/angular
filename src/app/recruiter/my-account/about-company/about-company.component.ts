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
import { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-about-company',
  templateUrl: './about-company.component.html',
  styleUrls: ['./about-company.component.css']
})
export class AboutCompanyComponent extends BaseModel implements OnInit {
  imgUrl:any={
    'image':'/assets/img/client/DefaultCompanyLogo.png',
    'buttonText':'Upload Company Logo',
    'id':0,
    'picType':'comp-pics'
  }
  @ViewChild(TextEditorComponent) textEditorComponent: TextEditorComponent;
  @ViewChild(FileUploadComponent) fileUploadComponent : FileUploadComponent;
  recruiterModel:RecruiterModel=new RecruiterModel();
  constructor(private recruiterService:RecruiterService,
              private toastr:ToastrService) {super();}

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
          this.imgUrl.id=this.recruiterModel.reqId;
          if(this.recruiterModel.companyDetail.companyLogo){
            this.recruiterModel.companyDetail.companyLogo=environment.baseUrl+this.recruiterModel.companyDetail.companyLogo;
            this.imgUrl.image=this.recruiterModel.companyDetail.companyLogo;
          }
          this.recruiterService.recruiterSubject.next(this.recruiterModel);
      }},(err: HttpErrorResponse) => {
            this.toastr.error(err.message);
          })
    }
  }

 
  onSubmit(form:NgForm){
    this.recruiterModel.companyDetail=new CompanyDetail();
    this.recruiterModel.companyDetail.description=this.textEditorComponent.description;
    if(this.fileUploadComponent.selectedFile){
      this.recruiterModel.companyDetail.companyLogo="images/comp-pics/"+this.imgUrl.id+'.'+this.fileUploadComponent.selectedFile.name.split('.')[1].toLowerCase();
    }
    this.recruiterService.updateReqProfile(this.recruiterModel).subscribe((result:any)=>{
      this.toastr.success(JSON.parse(result).message);
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message);
     })
    }
}
