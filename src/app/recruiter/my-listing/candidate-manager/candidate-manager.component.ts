import { Component, OnInit } from '@angular/core';
import { BaseModel } from 'src/app/shared/models/base.model';
import { RecruiterModel } from '../../my-account/models/recruiter.model';
import { RecruiterService } from '../../recruiter-services/recruiter.service';

@Component({
  selector: 'app-candidate-manager',
  templateUrl: './candidate-manager.component.html',
  styleUrls: ['./candidate-manager.component.css']
})
export class CandidateManagerComponent extends BaseModel implements OnInit {
  recruiterModel:RecruiterModel=new RecruiterModel();
  
  constructor(private recruiterService:RecruiterService,
              ) { super()}

  ngOnInit() {
    this.getCandidateDetails();
  }

  getCandidateDetails(){
    this.email=localStorage.getItem('email');
    this.recruiterService.getRecruiterDetails(this.email).subscribe((result:RecruiterModel)=>{
      this.recruiterModel=result;
    });
  }
}
