import { Component, OnInit } from '@angular/core';
import { TrainingModel } from 'src/app/seeker/models/training.model';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
import { BaseModel } from 'src/app/shared/models/base.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JobSeekerModel } from 'src/app/seeker/models/job-seeker-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent extends BaseModel implements OnInit {
  jobSeekerModel:JobSeekerModel=new JobSeekerModel();
  training:TrainingModel=new TrainingModel();
  trainingList:Array<TrainingModel>=new Array<TrainingModel>();
  constructor(private seekerService:SeekerService,
              private toastr:ToastrService,
              private router:Router) {
                super(); 
                this.actionType='add';
              
                this.jobSeekerModel.training=new Array<TrainingModel>();
              }

  ngOnInit() { 
    this.isAdd=true;
    this.isDelete=true;
    this.getTraningList();
    this.training.trainingMonth = "";
    this.training.trainingYear ="";
  }

  onMonthChange(month: string) {
    this.training.trainingMonth = month;
  }
  onYearChange(year: string) {
    this.training.trainingYear = year;
  }
  update(){
    const targetIdx = this.jobSeekerModel.training.map(item => item.trainingId).indexOf(this.training.trainingId);
    this.jobSeekerModel.training[targetIdx] = this.training;
    this.isDelete=true;
  }
  edit(training:TrainingModel){
    this.training= this.jobSeekerModel.training.filter(x=>x.trainingId==training.trainingId)[0];
    this.isUpdate = true;
    this.isAdd = false;
    this.actionType='edit';
    this.isDelete=false;
  }
  delete(training:TrainingModel){
    const targetIdx = this.jobSeekerModel.training.map(item => item.trainingId).indexOf(training.trainingId);
    this.jobSeekerModel.training.splice(targetIdx,1)
    if(this.jobSeekerModel.training.length==0){
      this.jobSeekerModel.training=null;
    }
  }
  add(form:NgForm){
    if(form.valid){
      if(this.jobSeekerModel.training){
        if(this.jobSeekerModel.training.filter(x=>x.trainingId!==this.training.trainingId)&& this.actionType=='add'){
         let maxId = this.jobSeekerModel.training.reduce((max, character) => (character.trainingId > max ? character.trainingId : max),
         this.jobSeekerModel.training[0].trainingId);
         this.training.trainingId=maxId+1;
        }
       }else{
        this.training.trainingId=1;
        this.jobSeekerModel.training=[];
       }
      this.jobSeekerModel.training.push(this.training);
      this.training=new TrainingModel();
    }
  }

 

  getTraningList(){
    this.email=localStorage.getItem('email');
    this.seekerService.getTrainingList(this.email).subscribe((result:JobSeekerModel)=>{
      this.jobSeekerModel=result;
      if(this.jobSeekerModel.training){
        this.seekerService.tickSubject.next('tn');
      }
      this.seekerService.jobSeekerSubject.next(this.jobSeekerModel);
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message);
    })
  }
  nextPage(){
    this.seekerService.saveTraining(this.jobSeekerModel).subscribe((result:any)=>{
      this.toastr.success(result.message);
      this.getTraningList();
      this.isAdd=true;
      this.isUpdate=false;
      this.training=new TrainingModel();
      this.router.navigate(['/seeqem/my-profile/certificate'])
    }, (err: HttpErrorResponse) => {
      this.toastr.error(err.message);
      console.log(err);
    })  
  }
}
