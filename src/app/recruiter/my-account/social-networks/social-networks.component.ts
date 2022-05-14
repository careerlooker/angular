import { Component, OnInit } from '@angular/core';
import { RecruiterService } from '../../recruiter-services/recruiter.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseModel } from 'src/app/shared/models/base.model';
import { RecruiterModel } from '../models/recruiter.model';
import { SocialNetwork } from '../models/social-network.model';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.css']
})
export class SocialNetworksComponent extends BaseModel implements OnInit {
  recruiterModel:RecruiterModel=new RecruiterModel();
  socialNetwork:SocialNetwork=new SocialNetwork();
  socialNetworkName:SocialNetwork=new SocialNetwork();
  socialNetworkDropdownList:Array<SocialNetwork>=new Array<SocialNetwork>();
  constructor(private recruiterService:RecruiterService,private toastr:ToastrService) { super()}

  ngOnInit() {
    this.recruiterModel.socialNetwork=new Array<SocialNetwork>();
    this.socialNetworkDropdownList=new Array<SocialNetwork>();
    this.isAdd=true;
    this.addNewDiv();
    this.getSocialDropdownList();
    this.getSocialNetwork();
  }
  onSocialNetworkChange(value:any){
    if(value!="" && value!=undefined){
      this.socialNetwork.name=value;
    }
  }
  getSocialDropdownList(){
    this.recruiterService.getSocialDropdownList().subscribe((result:any)=>{
      this.socialNetworkDropdownList=result;
    });
  }

  getSocialNetwork(){
    this.email=localStorage.getItem('email');
    if(this.email){
      this.recruiterService.getRecruiterDetails(this.email).subscribe((result: any)=>{
        if(result!=null){
          this.recruiterModel=result;
        }
      },(err: HttpErrorResponse) => {
            this.toastr.error(err.message,'Social Network Info');
           })
    }
  }
   updateSocialNetwork(form:NgForm){
   
    this.recruiterModel.socialNetwork.push(this.socialNetworkName);

     this.recruiterService.updateReqProfile(this.recruiterModel).subscribe((result:any)=>{
       this.getSocialNetwork(); 
       this.toastr.success(JSON.parse(result).message,'Social Network Info');
     },(err: HttpErrorResponse) => {
      this.toastr.error(err.message,'Social Network Info');
     })
   }

   add(form:NgForm){
    if(form.valid){
      if(this.socialNetwork.name!="" && this.socialNetwork.name!= undefined){
       let social= this.socialNetworkDropdownList.filter(x=>x.name==this.socialNetwork.name)[0];
       this.recruiterModel.socialNetwork=[];
       this.socialNetworkName.id=social.id;
       this.recruiterModel.socialNetwork.push(this.socialNetworkName);
       this.socialNetwork=new SocialNetwork();
       this.socialNetworkName=new SocialNetwork();
       this.addNewDiv();
      }
      else{
        
      }
    }
  }
  containers = [];
  addNewDiv() {
    this.containers.push(this.containers.length);
  }
}
