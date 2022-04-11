import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
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
  jobSeekerModel:JobSeekerModel=new JobSeekerModel();
  otherDetails:OthersDetails;
  currentJobType=[{"currentJobType":"Permanent"},{"currentJobType":"Part Time"},{"currentJobType":"Contractual"}];   
  employementType=[{"Id":1,"employementType":"Full Time"},{"Id":2,"employementType":"Part Time"},{"Id":3,"employementType":"Contractual"}];   
  willingToRelocate=[{"willingToRelocate":"Yes"},{"willingToRelocate":"No"}];
  noticePeriob=[{"noticePeriob":15 },{"noticePeriob":30},{"noticePeriob":45},{"noticePeriob":60}, {"noticePeriob":75},{"noticePeriob":90}]; 

  constructor(private seekerService: SeekerService,
    private toastr: ToastrService,
    private router:Router) { }

  ngOnInit() {
    this.jobSeekerModel.otherDetails=new OthersDetails();
    this.otherDetails={} as OthersDetails;
   
    this.getOtherDetails();
  }

  getOtherDetails(){
    this.seekerService.seekerLogin(localStorage.getItem('email')).subscribe((result:JobSeekerModel)=>{
       this.jobSeekerModel=result;
       if(this.jobSeekerModel.otherDetails){
        this.otherDetails=this.jobSeekerModel.otherDetails;
       this.seekerService.tickSubject.next('od');
       this.seekerService.jobSeekerSubject.next(this.jobSeekerModel);
       }
      
    })
  }
  onCurrentJobTypeSelect(event:any){
    if(event){
    this.otherDetails.currentJobType=event;
    }
  }
  onEmployementTypeSelect(event:any){
    if(event){
     this.otherDetails.employementType=event;
    }
  }
  onWillingToRelocateSelect(event:any){
    if(event){
      this.otherDetails.willingToRelocate=event;
    }
  }
  onNoticePeriobSelect(event:any){
    if(event){
      this.otherDetails.noticePeriod=event;
    }
  }

  onSubmit(form:NgForm){
    if(form.valid){
      this.otherDetails.visaStatus=form.value.visaStatus;
      this.jobSeekerModel.otherDetails=this.otherDetails;
      this.seekerService.updateSeekerProfile( this.jobSeekerModel).subscribe((result:any)=>{
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
