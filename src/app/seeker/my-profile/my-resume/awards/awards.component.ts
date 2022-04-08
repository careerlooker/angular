import { Component, OnInit } from '@angular/core';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BaseModel } from 'src/app/shared/models/base.model';
import { AwardsModel } from 'src/app/seeker/models/awards.model';
import { JobSeekerModel } from 'src/app/seeker/models/job-seeker-model';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent extends BaseModel implements OnInit {
  jobSeekerModel:JobSeekerModel=new JobSeekerModel();
  awards:AwardsModel=new AwardsModel();
  awardsList:Array<AwardsModel>=new Array<AwardsModel>();
  
  constructor(private seekerService:SeekerService,
    private toastr:ToastrService,
    private router:Router) {
      super(); 
      this.actionType='add';
    }

    ngOnInit() { 
      this.jobSeekerModel.awards=new Array<AwardsModel>();
      this.isAdd=true;
      this.isDelete=true;
      this.getawardsList();
      this.awards.awardMonth = "";
      this.awards.awardYear = "";
    }
  
    onMonthChange(month: string) {
      this.awards.awardMonth = month;
    }
    onYearChange(year: string) {
      this.awards.awardYear = year;
    }

    update(){
      const targetIdx = this.jobSeekerModel.awards.map(item => item.awardId).indexOf(this.awards.awardId);
      this.jobSeekerModel.awards[targetIdx] = this.awards;
      this.isDelete=true;
    }
    edit(award:AwardsModel){
      this.awards= this.jobSeekerModel.awards.filter(x=>x.awardId==award.awardId)[0];
      this.isUpdate = true;
      this.isAdd = false;
      this.actionType='edit';
      this.isDelete=false;
    }
    delete(award:AwardsModel){
      const targetIdx = this.jobSeekerModel.awards.map(item => item.awardId).indexOf(award.awardId);
      this.jobSeekerModel.awards.splice(targetIdx,1)
    }
    add(form:NgForm){
      if(form.valid){
        if(this.jobSeekerModel.awards){
          if(this.jobSeekerModel.awards.filter(x=>x.awardId!==this.awards.awardId)&& this.actionType=='add'){
           let maxId = this.jobSeekerModel.awards.reduce((max, character) => (character.awardId > max ? character.awardId : max),
           this.jobSeekerModel.awards[0].awardId);
           this.awards.awardId=maxId+1;
          }
         }else{
          this.awards.awardId=1;
          this.jobSeekerModel.awards=[];
         }
        this.jobSeekerModel.awards.push(this.awards);
      }
    }
  
    getawardsList(){
      this.email=localStorage.getItem('email')
      this.seekerService.getawardsList(this.email).subscribe((result:JobSeekerModel)=>{
        this.jobSeekerModel=result;
        if(this.jobSeekerModel.awards){
          this.seekerService.tickSubject.next('ad');
          this.seekerService.jobSeekerSubject.next(this.jobSeekerModel);
        }
      })
    }
    nextPage(){
      this.seekerService.saveAwards(this.jobSeekerModel).subscribe((result:any)=>{
        this.toastr.success(result.message);
        this.getawardsList();
        this.isAdd=true;
        this.isUpdate=false;
        this.awards=new AwardsModel();
        this.router.navigate(['/seeqem/my-profile/language'])
      }, (err: HttpErrorResponse) => {
        this.toastr.error(err.message);
        console.log(err);
      });
    }
}
