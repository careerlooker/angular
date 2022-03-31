import { Component, OnInit } from '@angular/core';
import { CertificateModel } from 'src/app/seeker/models/certificate.model';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BaseModel } from 'src/app/shared/models/base.model';
import { NgForm } from '@angular/forms';
import { JobSeekerModel } from 'src/app/seeker/models/job-seeker-model';

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
      this.sekId=+localStorage.getItem('seekId');
      this.actionType='add';
    }

    ngOnInit() { 
      this.getCertificateList();
      this.certificate.certMonth = "";
      this.certificate.certYear = 0;
    }
  
    onMonthChange(month: string) {
      this.certificate.certMonth = month;
    }
    onYearChange(year: number) {
      this.certificate.certYear = year;
    }
  
    onSubmit(form:NgForm){
      if(form.valid){
        this.certificate.certName=form.value.certName;
        this.certificate.certMonth=form.value.certMonth;
        this.certificate.certYear=form.value.certYear;
        this.certificate.sekId=this.sekId;
        let certList=new Array<CertificateModel>();
        certList.push(this.certificate);
  
        this.seekerService.saveCertificate(this.jobSeekerModel,this.actionType).subscribe((result:any)=>{
          this.toastr.success(result.message);
          this.getCertificateList();
          this.isAdd=true;
          this.isUpdate=false;
          this.certificate=new CertificateModel();
        })
      }
    }
  
    RowSelected(certificate:CertificateModel){
      this.certificate=certificate;
      this.isAdd=false;
      this.isUpdate=true;
      this.actionType='edit';
    }
  
    getCertificateList(){
      this.seekerService.getCertificateList(this.email).subscribe((result:JobSeekerModel)=>{
        this.jobSeekerModel=result;
        if(this.certificateList.length>0){
          this.seekerService.tickSubject.next('ca');
        }
      })
    }
    nextPage(){
        this.router.navigate(['/seeqem/my-profile/awards'])
    }

}
