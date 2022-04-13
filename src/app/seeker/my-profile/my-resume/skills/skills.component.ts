import { Component, OnInit, ViewChild } from '@angular/core';
import { RecruiterService } from 'src/app/recruiter/recruiter-services/recruiter.service';
import { KeySkillsModel } from 'src/app/recruiter/my-listing/models/key-skills.model';
import { SkillsModel } from 'src/app/seeker/models/skills.model';
import { NgForm } from '@angular/forms';
import { BaseModel } from 'src/app/shared/models/base.model';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { JobSeekerModel } from 'src/app/seeker/models/job-seeker-model';
import { TextEditorComponent } from 'src/app/shared/components/text-editor/text-editor.component';
import { StarRatingComponent } from 'src/app/shared/components/star-rating/star-rating.component';
import { StarRating } from 'src/app/seeker/models/start-rating.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent extends BaseModel implements OnInit {
  @ViewChild(TextEditorComponent) textEditorComponent: TextEditorComponent;
  @ViewChild(StarRatingComponent) starRatingComponent: StarRatingComponent;
  jobSeekerModel:JobSeekerModel=new JobSeekerModel();
  keySkillsDropdownList:Array<KeySkillsModel>=new Array<KeySkillsModel>();
  skills:SkillsModel=new SkillsModel();
  skillList:Array<SkillsModel>=new Array<SkillsModel>();
  selectedSkills: KeySkillsModel=new KeySkillsModel();
  dropdownSettings={};
  ratingClicked: number;
  itemIdRatingClicked: string;
  item:StarRating;
  items: StarRating[] = [
    { 'id': 0, 'rating': 3, 'contact': 'Dennis Phillips', 'company': 'PROFLEX' },
    { 'id': 1, 'rating': 1, 'contact': 'Morgan Mccarthy', 'company': 'CENTREXIN' },
    { 'id': 2, 'rating': 2, 'contact': 'Brady Craft', 'company': 'JIMBIES' },
    { 'id': 3, 'rating': 5, 'contact': 'Alvarado Roman', 'company': 'TERRAGO' },
    { 'id': 4, 'rating': 4, 'contact': 'Clark Daugherty', 'company': 'ISOTRONIC' }
  ];
  constructor(private recruiterService:RecruiterService, 
              private seekerService:SeekerService,   
              private toastr:ToastrService,
              private router:Router,) {  
              super()
   }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };
    this.jobSeekerModel.skills=new Array<SkillsModel>();
    this.isAdd=true;
    this.isDelete=true;
    this.items=[{ 'id': 0, 'rating': 0, 'contact': 'Dennis Phillips', 'company': 'PROFLEX' }];
    this.getKeySkills();
    this.actionType='add';
    this.getSkills();
  }

  getKeySkills(){
    this.recruiterService.getKeySkills().subscribe((result:Array<KeySkillsModel>)=>{
        this.keySkillsDropdownList=result;
      })
    }


    getSkills(){
      this.email=localStorage.getItem('email');
      this.seekerService.getSkillList(this.email).subscribe((result:JobSeekerModel)=>{
          this.jobSeekerModel=result;
          if(this.jobSeekerModel.skills){
            this.seekerService.tickSubject.next('ss');
          }
          this.seekerService.jobSeekerSubject.next(this.jobSeekerModel);
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);
        console.log(err);})
    }

    update(){
      const targetIdx = this.jobSeekerModel.skills.map(item => item.skillId).indexOf(this.skills.skillId);
      this.jobSeekerModel.skills[targetIdx] = this.skills;
      this.isDelete=true;
    }
    edit(skill:SkillsModel){
      this.skills= this.jobSeekerModel.skills.filter(x=>x.skillId==skill.skillId)[0];
      this.starRatingComponent.rating=this.skills.rating;
      this.isUpdate = true;
      this.isAdd = false;
      this.actionType='edit';
      this.isDelete=false;
    }
    delete(skill:SkillsModel){
      const targetIdx = this.jobSeekerModel.skills.map(item => item.skillId).indexOf(skill.skillId);
      this.jobSeekerModel.skills.splice(targetIdx,1)
    }
    add(form:NgForm){
      if(form.valid){
        if(this.jobSeekerModel.skills){
          if(this.jobSeekerModel.skills.filter(x=>x.skillId!==this.skills.skillId)&& this.actionType=='add'){
           let maxId = this.jobSeekerModel.skills.reduce((max, character) => (character.skillId > max ? character.skillId : max),
           this.jobSeekerModel.skills[0].skillId);
           this.skills.skillId=maxId+1;
          }
         }else{
          this.skills.skillId=1;
          this.jobSeekerModel.skills=[];
         }
        this.jobSeekerModel.skills.push(this.skills);
        this.skills=new SkillsModel();
      }
    }
  

    nextPage(){
      this.seekerService.saveSkills(this.jobSeekerModel).subscribe((result:any)=>{
        if(result){
        this.toastr.success(JSON.parse(result).message);
        this.isUpdate=false;
        this.isAdd=true;
        this.getSkills();
        this.skills=new SkillsModel();
        this.selectedSkills=new KeySkillsModel();
        this.selectedSkills.name='';
        this.selectedSkills.id=null;
        this.router.navigate(['/seeqem/my-profile/training']);
        }
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);
        console.log(err);})
    }
  
    onItemSelect(item: any) {
      this.skills.name=item.name;
      console.log(item);
    }
    onSelectAll(items: any) {
      console.log(items);
    }
  

    ratingComponentClick(clickObj: any): void {
       const item = this.items.find(((i: any) => i.id === clickObj.itemId));
      // if (!!item) {
      //   item.rating = clickObj.rating;
      //   this.ratingClicked = clickObj.rating;
      //   this.itemIdRatingClicked = item.company;
      // }
        this.skills.rating=clickObj.rating;
    }
}

