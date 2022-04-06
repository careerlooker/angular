import { Component, OnInit } from '@angular/core';
import { BaseModel } from 'src/app/shared/models/base.model';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LanguageModel } from 'src/app/seeker/models/language.model';
import { JobSeekerModel } from 'src/app/seeker/models/job-seeker-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent extends BaseModel implements OnInit {
  jobSeekerModel:JobSeekerModel=new JobSeekerModel();
    language:LanguageModel=new LanguageModel();

  constructor(private seekerService:SeekerService,
    private toastr:ToastrService,
    private router:Router) {
      super(); 
    }

    ngOnInit() { 
      this.actionType='add';
      this.isAdd=true;
      this.isDelete=true;
      this.jobSeekerModel.language=new Array<LanguageModel>();
      this.getLanguageList();
    }

    update(){
      const targetIdx = this.jobSeekerModel.language.map(item => item.langId).indexOf(this.language.langId);
      this.jobSeekerModel.language[targetIdx] = this.language;
      this.isDelete=true;
    }
    edit(language:LanguageModel){
      this.language= this.jobSeekerModel.language.filter(x=>x.langId==language.langId)[0];
      this.isUpdate = true;
      this.isAdd = false;
      this.actionType='edit';
      this.isDelete=false;
    }
    delete(language:LanguageModel){
      const targetIdx = this.jobSeekerModel.language.map(item => item.langId).indexOf(language.langId);
      this.jobSeekerModel.language.splice(targetIdx,1)
    }
    add(form:NgForm){
      if(form.valid){
        if(this.jobSeekerModel.language.length>0){
          if(this.jobSeekerModel.language.filter(x=>x.langId!==this.language.langId)&& this.actionType=='add'){
           let maxId = this.jobSeekerModel.language.reduce((max, character) => (character.langId > max ? character.langId : max),
           this.jobSeekerModel.language[0].langId);
           this.language.langId=maxId+1;
          }
         }else{
          this.language.langId=1;
         }
        this.jobSeekerModel.language.push(this.language);
      }
    }

    getLanguageList(){
      this.email=localStorage.getItem('email');
      this.seekerService.getLanguageList(this.email).subscribe((result:JobSeekerModel)=>{
        this.jobSeekerModel=result;
        if(this.jobSeekerModel.language.length>0){
          this.seekerService.tickSubject.next('lg');
        }
      })
    }
    nextPage(){
      this.seekerService.saveLanguage(this.jobSeekerModel,this.actionType).subscribe((result:any)=>{
        this.toastr.success(result.message);
        this.getLanguageList();
        this.isAdd=true;
        this.isUpdate=false;
        this.language=new LanguageModel();
        this.router.navigate(['/seeqem/my-profile/contact-details']);
      }, (err: HttpErrorResponse) => {
        this.toastr.error(err.message);
        console.log(err);
      })
    
    }

}
