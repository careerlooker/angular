import { Component, OnInit } from '@angular/core';
import { RecruiterModel } from '../my-account/models/recruiter.model';
import { RecruiterService } from '../recruiter-services/recruiter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recruiterModel:RecruiterModel=new RecruiterModel();
  constructor(private recruiterService:RecruiterService) { }

  ngOnInit() {
    this.recruiterService.getRecruiterDetails(localStorage.getItem('email')).subscribe(result=>{
      if(result){
        this.recruiterModel=result;
      }
    })
    this.recruiterService.recruiterSubject.next(this.recruiterModel);
  }

}
