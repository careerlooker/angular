import { Component, OnInit } from '@angular/core';
import { BaseModel } from 'src/app/shared/models/base.model';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LanguageModel } from 'src/app/seeker/models/language.model';
import { JobSeekerModel } from 'src/app/seeker/models/job-seeker-model';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent extends BaseModel implements OnInit {
  jobSeekerModel:JobSeekerModel=new JobSeekerModel();
    language:LanguageModel=new LanguageModel();
    languageList:Array<LanguageModel>=new Array<LanguageModel>();

  constructor(private seekerService:SeekerService,
    private toastr:ToastrService,
    private router:Router) {
      super(); 
      this.sekId=+localStorage.getItem('seekId');
      this.actionType='add';
    }

    ngOnInit() { 
      this.getLanguageList();
    }
  
    onSubmit(form:NgForm){
      if(form.valid){
        this.language.langName=form.value.langName;
        this.language.langDesc=form.value.langDesc;
        this.language.rating=form.value.rating;
        this.language.sekId=this.sekId;
        let langList=new Array<LanguageModel>();
        langList.push(this.language);
        this.seekerService.saveLanguage(this.jobSeekerModel,this.actionType).subscribe((result:any)=>{
          this.toastr.success(result.message);
          this.getLanguageList();
          this.isAdd=true;
          this.isUpdate=false;
          this.language=new LanguageModel();
        })
      }
    }
  
    RowSelected(language:LanguageModel){
      this.language=language;
      this.isAdd=false;
      this.isUpdate=true;
      this.actionType='edit';
    }
  
    getLanguageList(){
      this.seekerService.getLanguageList(this.email).subscribe((result:JobSeekerModel)=>{
        this.jobSeekerModel=result;
        if(this.languageList.length>0){
          this.seekerService.tickSubject.next('lg');
        }
      })
    }
    nextPage(){
        this.router.navigate(['/seeqem/my-profile/contact-details'])
    }

}
