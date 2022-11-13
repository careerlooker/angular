import { Component, OnInit } from '@angular/core';
import { RecruiterService } from '../recruiter-services/recruiter.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { RecruiterModel } from '../my-account/models/recruiter.model';
import { PersonalInformation } from '../my-account/models/personal-Information.model';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-recruiter-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class RecruiterNavigationComponent implements OnInit {
  display: string = 'none';

  recruiterModel:RecruiterModel=new RecruiterModel();
  private email: string;
  credentials:string;
  progressBar:number=10;
  profileUrl='./assets/img/job-seeker.png'
  constructor(private recruiterService: RecruiterService, 
              private toastr: ToastrService,
              private sharedService:SharedService) { }

  ngOnInit() {
    this.recruiterModel.personalInfo=new PersonalInformation();
    this.leftProfile();
    this.change();
    this.profileMessage();
  }
 

  leftProfile() {
      this.recruiterService.getRecruiterDetails(localStorage.getItem('email')).subscribe((result: any) => {
       if(result!=null){
       this.recruiterModel=result;
       this.profileUrl=environment.baseUrl+this.recruiterModel.personalInfo.recruiterPhoto;
       }
      }, (err: HttpErrorResponse) => {
        this.toastr.error(err.message);
        console.log(err);
      })
    
  }

  openModal() {
    this.display = 'block';
  }

  onCloseHandled() {
    this.display = 'none';
  }

  onSubmit(form:NgForm){
      this.recruiterModel.personalInfo.firstName=form.value.firstName;
      this.recruiterModel.personalInfo.lastName=form.value.lastName;
      this.recruiterModel.personalInfo.companyName=form.value.companyName;
      this.recruiterModel.email=this.email;
      this.recruiterService.updateReqProfile(this.recruiterModel).subscribe((result:any)=>{
        this.toastr.success(result);
        this.leftProfile();
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);
        console.log(err);
      })
  }

  change(){
    this.sharedService.profileMessage.subscribe((result:any)=>{
      if(result){
        this.profileUrl=result;
      }
    })
  }

  profileMessage(){
    this.recruiterService.recruiterMessage.subscribe((result:any)=>{
      if(result){
        this.recruiterModel=result;
      }
    });
  }

  
}
