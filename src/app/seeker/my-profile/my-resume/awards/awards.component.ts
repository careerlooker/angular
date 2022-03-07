import { Component, OnInit } from '@angular/core';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BaseModel } from 'src/app/shared/models/base.model';
import { AwardsModel } from 'src/app/seeker/models/awards.model';


@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent extends BaseModel implements OnInit {
  awards:AwardsModel=new AwardsModel();
  awardsList:Array<AwardsModel>=new Array<AwardsModel>();
  
  constructor(private seekerService:SeekerService,
    private toastr:ToastrService,
    private router:Router) {
      super(); 
      this.sekId=+localStorage.getItem('seekId');
      this.actionType='add';
    }

    ngOnInit() { 
      this.getawardsList();
      this.awards.awardMonth = "";
      this.awards.awardYear = 0;
    }
  
    onMonthChange(month: string) {
      this.awards.awardMonth = month;
    }
    onYearChange(year: number) {
      this.awards.awardYear = year;
    }
  
    onSubmit(form:NgForm){
      if(form.valid){
        this.awards.awardName=form.value.awardName;
        this.awards.awardMonth=form.value.awardMonth;
        this.awards.awardYear=form.value.awardYear;
        this.awards.sekId=this.sekId;
        let awarList=new Array<AwardsModel>();
        awarList.push(this.awards);
  
        this.seekerService.saveAwards(awarList,this.actionType).subscribe((result:any)=>{
          this.toastr.success(result.message);
          this.getawardsList();
          this.isAdd=true;
          this.isUpdate=false;
          this.awards=new AwardsModel();
        })
      }
    }
  
    RowSelected(awards:AwardsModel){
      this.awards=awards;
      this.isAdd=false;
      this.isUpdate=true;
      this.actionType='edit';
    }
  
    getawardsList(){
      this.seekerService.getawardsList(this.sekId).subscribe((result:Array<AwardsModel>)=>{
        this.awardsList=result;
        if(this.awardsList.length>0){
          this.seekerService.tickSubject.next('ad');
        }
      })
    }
    nextPage(){
        this.router.navigate(['/seeqem/my-profile/language'])
    }
}
