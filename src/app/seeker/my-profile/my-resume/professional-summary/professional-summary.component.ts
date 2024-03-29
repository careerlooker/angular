import { Component, OnInit, ViewChild } from '@angular/core';
import { TextEditorComponent } from 'src/app/shared/components/text-editor/text-editor.component';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { JobSeekerModel } from 'src/app/seeker/models/job-seeker-model';
import { professionalSummary } from 'src/app/seeker/models/professional-summary';

@Component({
  selector: 'app-professional-summary',
  templateUrl: './professional-summary.component.html',
  styleUrls: ['./professional-summary.component.css']
})
export class ProfessionalSummaryComponent implements OnInit {
  @ViewChild(TextEditorComponent) textEditorComponent: TextEditorComponent;
  jobSeekerModel:JobSeekerModel=new JobSeekerModel();
  email:string;
  constructor(private seekerService:SeekerService,
    private toastr:ToastrService,
    private router:Router) { }

  ngOnInit() {
    this.jobSeekerModel.profSummary=new professionalSummary();
    this.getProfesionalSummary();
  }

  getProfesionalSummary(){
    if(localStorage.getItem('userToken')!=null){
      this.jobSeekerModel.profSummary.summary=null;
      this.seekerService.seekerLogin(localStorage.getItem('email')).subscribe((result: JobSeekerModel)=>{
          this.jobSeekerModel=result;
          this.email=this.jobSeekerModel.email;
          if(this.jobSeekerModel.profSummary){
          this.seekerService.tickSubject.next('ps');
          }
          this.seekerService.jobSeekerSubject.next(this.jobSeekerModel);
      },(err: HttpErrorResponse) => {
            this.toastr.error(err.message,'Profile summary');
    });
  }
}

  onSubmit(form:NgForm){
    if(form.valid && this.textEditorComponent.description){
      this.jobSeekerModel.profSummary=new professionalSummary();
    this.jobSeekerModel.profSummary.summary=this.textEditorComponent.description
    this.jobSeekerModel.email=this.email;
    this.seekerService.updateSeekerProfile(this.jobSeekerModel).subscribe((result:any)=>{
      this.toastr.success(JSON.parse(result).message,'Profile summary');
      if(result){
        this.getProfesionalSummary(); 
        this.seekerService.tickSubject.next('ps');
      }
    },(err: HttpErrorResponse) => {
      this.toastr.error(err.message,'Profile summary');
     })
    }
  }
  next(){
    this.router.navigate(['/seeqem/my-profile/experience']);
  }
  back(){
    this.router.navigate(['/seeqem/my-profile/personal-info']);
  }
}
