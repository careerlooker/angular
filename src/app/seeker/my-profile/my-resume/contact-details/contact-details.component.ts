import { Component, OnInit } from '@angular/core';
import { BaseModel } from 'src/app/shared/models/base.model';
import { ContactDetailsModel } from 'src/app/seeker/models/contact-details.model';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { JobSeekerModel } from 'src/app/seeker/models/job-seeker-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent extends BaseModel implements OnInit {
  jobSeekerModel:JobSeekerModel=new  JobSeekerModel();
  contactDetails:ContactDetailsModel=new ContactDetailsModel();

constructor(private seekerService:SeekerService,
  private toastr:ToastrService,
  private router:Router) {
    super(); 
  }

  ngOnInit() { 
  this.jobSeekerModel.contactDetails=new Array<ContactDetailsModel>();
  this.isAdd=true;
  this.isDelete=true;
  this.actionType='add';
    this.getContactDetailsList();
  }


 
  update(){
    const targetIdx = this.jobSeekerModel.contactDetails.map(item => item.mediaId).indexOf(this.contactDetails.mediaId);
    this.jobSeekerModel.contactDetails[targetIdx] = this.contactDetails;
    this.isDelete=true;
  }
  edit(contact:ContactDetailsModel){
    this.contactDetails= this.jobSeekerModel.contactDetails.filter(x=>x.mediaId==contact.mediaId)[0];
    this.isUpdate = true;
    this.isAdd = false;
    this.actionType='edit';
    this.isDelete=false;
  }
  delete(contact:ContactDetailsModel){
    const targetIdx = this.jobSeekerModel.contactDetails.map(item => item.mediaId).indexOf(contact.mediaId);
    this.jobSeekerModel.contactDetails.splice(targetIdx,1)
  }
  add(form:NgForm){
    if(form.valid){
      if(this.jobSeekerModel.contactDetails){
        if(this.jobSeekerModel.contactDetails.filter(x=>x.mediaId!==this.contactDetails.mediaId)&& this.actionType=='add'){
         let maxId = this.jobSeekerModel.contactDetails.reduce((max, character) => (character.mediaId > max ? character.mediaId : max),
         this.jobSeekerModel.contactDetails[0].mediaId);
         this.contactDetails.mediaId=maxId+1;
        }
       }else{
        this.contactDetails.mediaId=1;
        this.jobSeekerModel.contactDetails=[];
       }
      this.jobSeekerModel.contactDetails.push(this.contactDetails);
    }
  }


  getContactDetailsList(){
    this.email=localStorage.getItem('email');
    this.seekerService.getContactDetailsList(this.email).subscribe((result:JobSeekerModel)=>{
      this.jobSeekerModel=result;
      if(this.jobSeekerModel.contactDetails){
        this.seekerService.tickSubject.next('cd');
         this.seekerService.jobSeekerSubject.next(this.jobSeekerModel);
        }   
    })
  }
  nextPage(){
    this.seekerService.saveContactDetails(this.jobSeekerModel).subscribe((result:any)=>{
      this.toastr.success(result.message);
      this.getContactDetailsList();
      this.isAdd=true;
      this.isUpdate=false;
      this.contactDetails=new ContactDetailsModel();
      this.router.navigate(['/seeqem/my-profile/other-details'])
    } ,(err: HttpErrorResponse) => {
      this.toastr.error(err.message);
      console.log(err);
    })
     
  }
}
