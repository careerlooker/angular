import { Component, OnInit } from '@angular/core';
import { CertificateModel } from 'src/app/seeker/models/certificate.model';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BaseModel } from 'src/app/shared/models/base.model';
import { NgForm } from '@angular/forms';
import { JobSeekerModel } from 'src/app/seeker/models/job-seeker-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css']
})
export class CertificationComponent extends BaseModel implements OnInit {
  jobSeekerModel:JobSeekerModel=new JobSeekerModel();
  certificate:CertificateModel=new CertificateModel();
  certificateList:Array<CertificateModel>=new Array<CertificateModel>();
  
  constructor(private seekerService:SeekerService,
    private toastr:ToastrService,
    private router:Router) {
      super(); 
      this.actionType='add';
    }

    ngOnInit() { 
      this.isAdd=true;
      this.isDelete=true;
      this.jobSeekerModel.certification=new Array<CertificateModel>();
      this.getCertificateList();
      this.certificate.certMonth = "";
      this.certificate.certYear = "";
    }
  
    onMonthChange(month: string) {
      this.certificate.certMonth = month;
    }
    onYearChange(year: string) {
      this.certificate.certYear = year;
    }
  
    update(){
      const targetIdx = this.jobSeekerModel.certification.map(item => item.certId).indexOf(this.certificate.certId);
      this.jobSeekerModel.certification[targetIdx] = this.certificate;
      this.isDelete=true;
    }
    edit(certification:CertificateModel){
      this.certificate= this.jobSeekerModel.certification.filter(x=>x.certId==certification.certId)[0];
      this.isUpdate = true;
      this.isAdd = false;
      this.actionType='edit';
      this.isDelete=false;
    }
    delete(certification:CertificateModel){
      const targetIdx = this.jobSeekerModel.certification.map(item => item.certId).indexOf(certification.certId);
      this.jobSeekerModel.certification.splice(targetIdx,1)
    }
    add(form:NgForm){
      if(form.valid){
        if(this.jobSeekerModel.certification){
          if(this.jobSeekerModel.certification.filter(x=>x.certId!==this.certificate.certId)&& this.actionType=='add'){
           let maxId = this.jobSeekerModel.certification.reduce((max, character) => (character.certId > max ? character.certId : max),
           this.jobSeekerModel.certification[0].certId);
           this.certificate.certId=maxId+1;
          }
         }else{
          this.certificate.certId=1;
          this.jobSeekerModel.certification=[];
         }
        this.jobSeekerModel.certification.push(this.certificate);
        this.certificate=new CertificateModel();
      }
    }
  
    getCertificateList(){
      this.email=localStorage.getItem('email');
      this.seekerService.getCertificateList(this.email).subscribe((result:JobSeekerModel)=>{
        this.jobSeekerModel=result;
        if(this.jobSeekerModel.certification){
          this.seekerService.tickSubject.next('ca');
          this.seekerService.jobSeekerSubject.next(this.jobSeekerModel);
        }
      })
    }
    nextPage(){
      this.seekerService.saveCertificate(this.jobSeekerModel).subscribe((result:any)=>{
        this.toastr.success(result.message);
        this.getCertificateList();
        this.isAdd=true;
        this.isUpdate=false;
        this.certificate=new CertificateModel();
        this.router.navigate(['/seeqem/my-profile/awards'])
      }, (err: HttpErrorResponse) => {
        this.toastr.error(err.message);
        console.log(err);
      })
    }
}
