import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseModel } from 'src/app/shared/models/base.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { BlockCompanies } from '../models/block-companies.model';
import { BlockCompany } from '../models/block-company.model';
import { JobSeekerModel } from '../models/job-seeker-model';
import { SeekerService } from '../seeker-services/seeker.service';

@Component({
  selector: 'app-block-companies',
  templateUrl: './block-companies.component.html',
  styleUrls: ['./block-companies.component.css']
})
export class BlockCompaniesComponent extends BaseModel implements OnInit {
  jobSeekerModel:JobSeekerModel=new JobSeekerModel();
  blockCompany:BlockCompanies=new BlockCompanies();
  blockCompanyList:Array<BlockCompany>=new Array<BlockCompany>();
  constructor(private seekerService: SeekerService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private router:Router) { super()}

  ngOnInit() {
    this.isAdd=true;
  this.isDelete=true;
  this.isSave=true;
  this.actionType='add';
  this.jobSeekerModel.blockCompanies=new Array<BlockCompanies>();
  this.blockCompany=new BlockCompanies();
  this.email=localStorage.getItem('email');
  this.getCompanyList();
  this.getBlockCompanyList();
  }

  getCompanyList(){
    if (this.email != null) {
      this.seekerService.getCompanyList(this.email).subscribe((result: Array<BlockCompany>) => {
        this.blockCompanyList = result;
        this.seekerService.jobSeekerSubject.next(this.jobSeekerModel); 
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);
      })
    }
  }
  getBlockCompanyList(){
  
    if (this.email != null) {
      this.seekerService.getExperienceList(this.email).subscribe((result: any) => {
        this.jobSeekerModel = result;
        if(this.jobSeekerModel.blockCompanies){
        this.seekerService.tickSubject.next('bc'); 
        this.seekerService.jobSeekerSubject.next(this.jobSeekerModel); 
        }  
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);
      })
    }
  }
  onCompanySelect(event){
    this.blockCompany.blockEmployerName=event;
  }
  update(){
    const targetIdx = this.jobSeekerModel.blockCompanies.map(item => item.employerId).indexOf(this.blockCompany.employerId);
    this.jobSeekerModel.blockCompanies[targetIdx] = this.blockCompany;
    this.isDelete=false;
    this.isSave=true;
    this.isAdd=false;
    this.isUpdate=false;
  }
  edit(block:BlockCompanies){
    this.blockCompany= this.jobSeekerModel.blockCompanies.filter(x=>x.employerId==block.employerId)[0];
    this.isUpdate = true;
      this.isAdd = false;
      this.actionType='edit';
      this.isDelete=false;
      this.isSave=false;
  }
  delete(block:BlockCompanies){
    const targetIdx = this.jobSeekerModel.blockCompanies.map(item => item.employerId).indexOf(block.employerId);
    this.jobSeekerModel.blockCompanies.splice(targetIdx,1)
     if(this.jobSeekerModel.blockCompanies.length==0){
      this.jobSeekerModel.blockCompanies=null;
    }
  }
  add(form:NgForm){
    if(form.valid){
      if(this.jobSeekerModel.blockCompanies){
        if(this.jobSeekerModel.blockCompanies.filter(x=>x.employerId!==this.blockCompany.employerId)&& this.actionType=='add'){
         let maxId = this.jobSeekerModel.blockCompanies.reduce((max, character) => (character.employerId > max ? character.employerId : max),
         this.jobSeekerModel.blockCompanies[0].employerId);
         this.blockCompany.employerId=maxId+1;
        }
       }else{
        this.blockCompany.employerId=1;
        this.jobSeekerModel.blockCompanies=[];
       }
      this.jobSeekerModel.blockCompanies.push(this.blockCompany);
      this.blockCompany=new BlockCompanies();
    }
  }


  save(){
    this.seekerService.saveContactDetails(this.jobSeekerModel).subscribe((result:any)=>{
      this.toastr.success(result.message);
      this.getBlockCompanyList();
      this.isAdd=true;
      this.isUpdate=false;
      this.isSave=true;
      this.isDelete=true;
      this.blockCompany=new BlockCompanies();
     
    } ,(err: HttpErrorResponse) => {
      this.toastr.error(err.message);
      console.log(err);
    })
     
  }
  next(){
    this.router.navigate(['/seeqem/my-profile/personal-info'])
    this.seekerService.jobSeekerSubject.next(this.jobSeekerModel);
  }
}
