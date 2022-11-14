import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';
import { JobSeekerModel } from '../models/job-seeker-model';
import { SeekerService } from '../seeker-services/seeker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  jobSeekerModel:JobSeekerModel=new JobSeekerModel();
  constructor(private seekerService:SeekerService,
    private sharedService:SharedService) { }

  ngOnInit() {
    this.seekerService.seekerLogin(localStorage.getItem('email')).subscribe(result=>{
      if(result){
        this.jobSeekerModel=result;
        this.sharedService.updateApprovalMessage(environment.baseUrl+this.jobSeekerModel.personalInfo.photo);
        this.seekerService.updatePersonalInfoMessage(this.jobSeekerModel);
        this.seekerService.updateSeekerNavigationToggleMessage(true);
      }
    })
  }
}
