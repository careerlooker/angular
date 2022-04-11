import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseModel } from 'src/app/shared/models/base.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { BlockCompanies } from '../models/block-companies.model';
import { JobSeekerModel } from '../models/job-seeker-model';
import { SeekerService } from '../seeker-services/seeker.service';

@Component({
  selector: 'app-block-companies',
  templateUrl: './block-companies.component.html',
  styleUrls: ['./block-companies.component.css']
})
export class BlockCompaniesComponent extends BaseModel implements OnInit {
  jobSeekerModel:JobSeekerModel=new JobSeekerModel();
  blockCompany:BlockCompanies=new BlockCompanies();
  constructor(private seekerService: SeekerService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private router:Router) { super()}

  ngOnInit() {
    this.getBlockCompanyList();
  }

  getBlockCompanyList(){
    this.email=localStorage.getItem('email');
    if (this.email != null) {
      this.seekerService.getExperienceList(this.email).subscribe((result: any) => {
        this.jobSeekerModel = result;
        if(this.jobSeekerModel.blockCompanies){
        this.seekerService.tickSubject.next('bc'); 
        this.seekerService.jobSeekerSubject.next(this.jobSeekerModel); 
        }  
      },(err: HttpErrorResponse) => {
        this.toastr.error(err.message);
      })
    }
  }
  onCompanySelect(event){
    this.blockCompany.blockEmployerName=event;
  }
}
