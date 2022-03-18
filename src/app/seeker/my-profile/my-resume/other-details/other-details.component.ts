import { Component, OnInit } from '@angular/core';
import { PersonalInfo } from 'src/app/seeker/models/personal-info.model';
import { NgForm } from '@angular/forms';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { JobSeekerModel } from 'src/app/seeker/models/job-seeker-model';
import { OthersDetails } from 'src/app/seeker/models/others-details.model';

@Component({
  selector: 'app-other-details',
  templateUrl: './other-details.component.html',
  styleUrls: ['./other-details.component.css']
})
export class OtherDetailsComponent implements OnInit {
  currentJobType=[{"currentJobType":"Full Time"},{"currentJobType":"Part Time"},{"currentJobType":"Contractual"}];   
  employementType=[{"employementType":"Full Time"},{"employementType":"Part Time"},{"employementType":"Contractual"}];   
  willingToRelocate=[{"willingToRelocate":"Yes"},{"willingToRelocate":"No"}];
  noticePeriob=[{"noticePeriob":15 },{"noticePeriob":30},{"noticePeriob":45},{"noticePeriob":60}, {"noticePeriob":75},{"noticePeriob":90}]; 
  jobSeekerModel:JobSeekerModel=new JobSeekerModel();
 

  constructor(private seekerrService: SeekerService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private router:Router) { }

  ngOnInit() {
    this.jobSeekerModel.otherDetails=new OthersDetails();
    this.getOtherDetails();
  }

  getOtherDetails(){
    this.seekerrService.seekerLogin(localStorage.getItem('email')).subscribe((result:JobSeekerModel)=>{
      if(Object.keys(result).length>0){
       this.jobSeekerModel=result;
       this.seekerrService.tickSubject.next('od');
      }
    })
  }
  onCurrentJobTypeSelect(event:any){
    if(event){
    this.jobSeekerModel.otherDetails.currentJobType=event;
    }
  }
  onEmployementTypeSelect(event:any){
    if(event){
     this.jobSeekerModel.otherDetails.employementType=event;
    }
  }
  onWillingToRelocateSelect(event:any){
    if(event){
      this.jobSeekerModel.otherDetails.willingToRelocate=event;
    }
  }
  onNoticePeriobSelect(event:any){
    if(event){
      this.jobSeekerModel.otherDetails.noticePeriod=event;
    }
  }

  onSubmit(form:NgForm){
    if(form.valid){
      this.jobSeekerModel.otherDetails.visaStatus=form.value.visaStatus;
     // this.otherDetails.email=localStorage.getItem('email');
     //this.jobSeekerModel.otherDetails.id=+ localStorage.getItem('seekId');
      this.seekerrService.updateSeekerProfile( this.jobSeekerModel).subscribe((result:any)=>{
        this.toastr.success(JSON.parse(result).message)
        if(result){
          this.router.navigate(['/seeqem/my-profile/r-and-d'])
        }
      }, (err: HttpErrorResponse) => {
        this.toastr.error(err.message);
        console.log(err);
      }) 
    }
  }
}
