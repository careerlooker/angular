import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseModel } from 'src/app/shared/models/base.model';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LanguageModel } from 'src/app/seeker/models/language.model';
import { JobSeekerModel } from 'src/app/seeker/models/job-seeker-model';
import { HttpErrorResponse } from '@angular/common/http';
import { StarRating } from 'src/app/seeker/models/start-rating.model';
import { StarRatingComponent } from 'src/app/shared/components/star-rating/star-rating.component';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent extends BaseModel implements OnInit {
  @ViewChild(StarRatingComponent) starRatingComponent: StarRatingComponent;
  jobSeekerModel:JobSeekerModel=new JobSeekerModel();
    language:LanguageModel=new LanguageModel();
    item:StarRating;
    items: StarRating[] = [
      { 'id': 0, 'rating': 3, 'contact': 'Dennis Phillips', 'company': 'PROFLEX' },
      { 'id': 1, 'rating': 1, 'contact': 'Morgan Mccarthy', 'company': 'CENTREXIN' },
      { 'id': 2, 'rating': 2, 'contact': 'Brady Craft', 'company': 'JIMBIES' },
      { 'id': 3, 'rating': 5, 'contact': 'Alvarado Roman', 'company': 'TERRAGO' },
      { 'id': 4, 'rating': 4, 'contact': 'Clark Daugherty', 'company': 'ISOTRONIC' }
    ];
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
      this.starRatingComponent.rating=this.language.rating;
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
        if(this.jobSeekerModel.language){
          if(this.jobSeekerModel.language.filter(x=>x.langId!==this.language.langId)&& this.actionType=='add'){
           let maxId = this.jobSeekerModel.language.reduce((max, character) => (character.langId > max ? character.langId : max),
           this.jobSeekerModel.language[0].langId);
           this.language.langId=maxId+1;
          }
         }else{
          this.language.langId=1;
          this.jobSeekerModel.language=[];
         }
        this.jobSeekerModel.language.push(this.language);
        this.language=new LanguageModel();
      }
    }

    getLanguageList(){
      this.email=localStorage.getItem('email');
      this.seekerService.getLanguageList(this.email).subscribe((result:JobSeekerModel)=>{
        this.jobSeekerModel=result;
        if(this.jobSeekerModel.language){
          this.seekerService.tickSubject.next('lg');
          this.seekerService.jobSeekerSubject.next(this.jobSeekerModel);
        }
      })
    }
    nextPage(){
      this.seekerService.saveLanguage(this.jobSeekerModel).subscribe((result:any)=>{
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
    ratingComponentClick(clickObj: any): void {
      const item = this.items.find(((i: any) => i.id === clickObj.itemId));
     // if (!!item) {
     //   item.rating = clickObj.rating;
     //   this.ratingClicked = clickObj.rating;
     //   this.itemIdRatingClicked = item.company;
     // }
       this.language.rating=clickObj.rating;
   }
}
