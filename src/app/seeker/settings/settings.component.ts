import { Component, OnInit } from '@angular/core';
import { BaseModel } from 'src/app/shared/models/base.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';
import { JobSeekerModel } from '../models/job-seeker-model';
import { PersonalInfo } from '../models/personal-info.model';
import { SettingsModel } from '../models/settings.model';
import { SeekerService } from '../seeker-services/seeker.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends BaseModel implements OnInit {
  settingsModel:SettingsModel=new SettingsModel();
  jobSeekerModel:JobSeekerModel=new JobSeekerModel();
  isNameLabel:boolean=true;
  isName:boolean=false;
  constructor(private seekerService:SeekerService,
    private sharedService:SharedService) { super();}

  ngOnInit() {
    this.jobSeekerModel.personalInfo=new PersonalInfo();
    this.email = localStorage.getItem('email');
    if (this.email != null) {
      this.getSeeker()
    }
  }
  getSeeker() {
    this.seekerService.seekerLogin(this.email).subscribe((result: JobSeekerModel) => {
      if (result != null) {
        this.jobSeekerModel = result;
        this.sharedService.updateApprovalMessage(environment.baseUrl+this.jobSeekerModel.personalInfo.photo);
        this.seekerService.updatePersonalInfoMessage(this.jobSeekerModel);
        this.seekerService.updateSeekerNavigationToggleMessage(true)
      }
    })
  }

  onNameCancel(){
    this.isName=false;
    this.isNameLabel=true;
  }
  onNameChange(){
    this.isName=true;
    this.isNameLabel=false;
  }
}
