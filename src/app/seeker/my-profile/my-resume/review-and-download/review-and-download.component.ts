import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactDetailsModel } from 'src/app/seeker/models/contact-details.model';
import { EducationModel } from 'src/app/seeker/models/education.model';
import { ExperienceModel } from 'src/app/seeker/models/experience.model';
import { JobSeekerModel } from 'src/app/seeker/models/job-seeker-model';
import { OthersDetails } from 'src/app/seeker/models/others-details.model';
import { PersonalInfo } from 'src/app/seeker/models/personal-info.model';
import { professionalSummary } from 'src/app/seeker/models/professional-summary';
import { TrainingModel } from 'src/app/seeker/models/training.model';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { StarRatingComponent } from 'src/app/shared/components/star-rating/star-rating.component';
import { BaseModel } from 'src/app/shared/models/base.model';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-review-and-download',
  templateUrl: './review-and-download.component.html',
  styleUrls: ['./review-and-download.component.css']
})
export class ReviewAndDownloadComponent extends BaseModel implements OnInit {
  jobSeekerModel:JobSeekerModel=new JobSeekerModel();
  @ViewChild(StarRatingComponent) starRatingComponent: StarRatingComponent;
  degree:any;
  title = 'htmltopdf';  
  @ViewChild('pdfTable') pdfTable: ElementRef;
  
  constructor( private seekerService:SeekerService,   
    private toastr:ToastrService,
    private router:Router) {
      super()
     }

  ngOnInit() {
    this.jobSeekerModel.personalInfo=new PersonalInfo();
    this.jobSeekerModel.education=new Array<EducationModel>();
    this.jobSeekerModel.experience=new Array<ExperienceModel>();
    this.jobSeekerModel.profSummary=new professionalSummary();
    this.jobSeekerModel.training=new Array<TrainingModel>();
    this.jobSeekerModel.contactDetails=new Array<ContactDetailsModel>();
    this.jobSeekerModel.otherDetails=new OthersDetails();
    this.getJObSeekerDetails();
  }
  replaceStrirng(description:any){
    if(description!=null && description!=undefined){
    let desc=description.replace(/<[^>]*>/g, '');
       return desc;
    }
  }
 
  getJObSeekerDetails(){
    this.email=localStorage.getItem('email');
    if (this.email != null) {
      this.seekerService.getExperienceList(this.email).subscribe((result: any) => {
        this.jobSeekerModel= result;
        this.jobSeekerModel.experience.sort((a,b)=>+b.resigningYear-+a.resigningYear)
        this.jobSeekerModel.education.sort((a,b)=>+b.graduateYear-+a.graduateYear)
        this.degree=this.jobSeekerModel.education[0].degree;
        this.seekerService.tickSubject.next('rd'); 
        this.jobSeekerModel.resume='rd';
        this.seekerService.jobSeekerSubject.next(this.jobSeekerModel); 
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);
      })
    }
  }

    downloadAsPDF() {
    const doc = new jsPDF();
   
    const pdfTable = this.pdfTable.nativeElement;
   
    var html = htmlToPdfmake(pdfTable.innerHTML);
     
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download(); 
     
  }

  home(){
    this.router.navigate(['/seeqem/my-profile/personal-info']);
  }
}

