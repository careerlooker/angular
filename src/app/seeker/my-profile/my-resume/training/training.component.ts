import { Component, OnInit } from '@angular/core';
import { TrainingModel } from 'src/app/seeker/models/training.model';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
import { BaseModel } from 'src/app/shared/models/base.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent extends BaseModel implements OnInit {
  training:TrainingModel=new TrainingModel();
  trainingList:Array<TrainingModel>=new Array<TrainingModel>();
  constructor(private seekerService:SeekerService,
              private toastr:ToastrService,
              private router:Router) {
                super(); 
                this.sekId=+localStorage.getItem('seekId');
                this.actionType='add';
              }

  ngOnInit() { 
    this.getTraningList();
    this.training.trainingMonth = "";
    this.training.trainingYear = 0;
  }

  onMonthChange(month: string) {
    this.training.trainingMonth = month;
  }
  onYearChange(year: number) {
    this.training.trainingYear = year;
  }

  onSubmit(form:NgForm){
    if(form.valid){
      this.training.trainingName=form.value.trainingName;
      this.training.trainingMonth=form.value.trainingMonth;
      this.training.trainingYear=form.value.trainingYear;
      this.training.sekId=this.sekId;
      let tranList=new Array<TrainingModel>();
      tranList.push(this.training);

      this.seekerService.saveTraining(tranList,this.actionType).subscribe((result:any)=>{
        this.toastr.success(result.message);
        this.getTraningList();
        this.isAdd=true;
        this.isUpdate=false;
        this.training=new TrainingModel();
      })
    }
  }

  RowSelected(training:TrainingModel){
    this.training=training;
    this.isAdd=false;
    this.isUpdate=true;
    this.actionType='edit';
  }

  getTraningList(){
    this.seekerService.getTrainingList(this.sekId).subscribe((result:Array<TrainingModel>)=>{
      this.trainingList=result;
      if(this.trainingList.length>0){
        this.seekerService.tickSubject.next('tn');
      }
    })
  }
  nextPage(){
      this.router.navigate(['/seeqem/my-profile/certificate'])
  }
}
