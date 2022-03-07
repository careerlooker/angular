import { Component, OnInit } from '@angular/core';
import { RecruiterService } from 'src/app/recruiter/recruiter-services/recruiter.service';
import { KeySkillsModel } from 'src/app/recruiter/my-listing/models/key-skills.model';
import { SkillsModel } from 'src/app/seeker/models/skills.model';
import { NgForm } from '@angular/forms';
import { BaseModel } from 'src/app/shared/models/base.model';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent extends BaseModel implements OnInit {
  keySkillsDropdownList:Array<KeySkillsModel>=new Array<KeySkillsModel>();
  skills:SkillsModel=new SkillsModel();
  skillList:Array<SkillsModel>=new Array<SkillsModel>();
  selectedSkills: KeySkillsModel=new KeySkillsModel();
  dropdownSettings={};

  constructor(private recruiterService:RecruiterService, 
              private seekerService:SeekerService,   
              private toastr:ToastrService,
              private router:Router,) {  
              super()
      this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
   }

  ngOnInit() {
    this.getKeySkills();
    this.actionType='add';
    this.getSkills();
  }

  getKeySkills(){
    this.recruiterService.getKeySkills().subscribe((result:Array<KeySkillsModel>)=>{
        this.keySkillsDropdownList=result;
      })
    }

    RowSelected(skill:SkillsModel){
      this.skills=this.skillList.filter(x=>x.id==skill.id)[0];
    //  this.selectedSkills=this.keySkillsDropdownList.filter(x=>x.name==this.skills.skill)[0];
      this.isAdd=false;
      this.isUpdate=true;
    }

    getSkills(){
      this.sekId=+localStorage.getItem('seekId');
      this.seekerService.getSkillList(this.sekId).subscribe((result:Array<SkillsModel>)=>{
          this.skillList=result;
          if(this.skillList.length>0){
            this.seekerService.tickSubject.next('ss');
          }
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);
        console.log(err);})
    }

    onSubmit(form:NgForm){
      if(form.valid){
        //  this.skills.skill=form.value.KeySkill[0].name;
         // this.skills.skillDescrioption=form.value.skillDescrioption;
          this.skills.rating=form.value.rating;
          this.skills.sekId=+localStorage.getItem('seekId');
          let skillList=new Array<SkillsModel>();
          skillList.push(this.skills);
          this.seekerService.saveSkills(skillList,this.actionType).subscribe((result:any)=>{
            this.toastr.success(JSON.parse(result).message);
            this.isUpdate=false;
            this.isAdd=true;
            this.getSkills();
            this.skills=new SkillsModel();
            this.selectedSkills=new KeySkillsModel();
            this.selectedSkills.name='';
            this.selectedSkills.id=null;
          },(err: HttpErrorResponse) => {
            this.toastr.error(err.message);
            console.log(err);})
       }
    }

    nextPage(){
      this.router.navigate(['/seeqem/my-profile/training']);
    }

    onItemSelect(item: any) {
      console.log(item);
    }
    onSelectAll(items: any) {
      console.log(items);
    }
}
