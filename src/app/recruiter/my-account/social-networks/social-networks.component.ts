import { Component, OnInit } from '@angular/core';
import { RecruiterService } from '../../recruiter-services/recruiter.service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseModel } from 'src/app/shared/models/base.model';
import { RecruiterModel } from '../models/recruiter.model';
import { SocialNetwork } from '../models/social-network.model';
import { SocialNetworkList } from '../models/social-network-list.model';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.css']
})
export class SocialNetworksComponent extends BaseModel implements OnInit {
  recruiterModel:RecruiterModel=new RecruiterModel();
  socialNetwork:SocialNetwork=new SocialNetwork();
  socialNetworkName:SocialNetwork=new SocialNetwork();
  socialNetworkDropdownList:Array<SocialNetworkList>=new Array<SocialNetworkList>();


  socialForm: FormGroup;  

  constructor(private recruiterService:RecruiterService,
              private toastr:ToastrService,
              private fb:FormBuilder) { 
                super();
              
                this.socialForm = this.fb.group({  
                  socialNetworks: this.fb.array([]) ,  
                });  
              }

  ngOnInit() {
    this.recruiterModel.socialNetwork=new Array<SocialNetwork>();
    this.socialNetworkDropdownList=new Array<SocialNetworkList>();
    this.isAdd=true;
    this.getSocialDropdownList();
  }

  socialNetworks() : FormArray {  
    return this.socialForm.get("socialNetworks") as FormArray  
  } 

  newQuantity(): FormGroup {  
    return this.fb.group({  
      socialNwId: '',  
      name: '',  
    })  
  }

  addQuantity() {  
    if(this.socialForm.valid){
    this.socialNetworks().push(this.newQuantity());  
    }
  }  
     
  removeQuantity(i:number) {  
    this.socialNetworks().removeAt(i);  
  } 
 
  onSocialNetworkChange(value:any){
    if(value!="" && value!=undefined){
      this.socialNetwork.name=value;
    }
  }
  getSocialDropdownList(){
    this.recruiterService.getSocialDropdownList().subscribe((result:any)=>{
      this.socialNetworkDropdownList=result;
      if(this.socialNetworkDropdownList){
        this.getSocialNetwork();
      }
    });
  }

  getSocialNetwork(){
    this.email=localStorage.getItem('email');
    if(this.email){
      this.recruiterService.getRecruiterDetails(this.email).subscribe((result: any)=>{
        if(result!=null){
          this.recruiterModel=result;
          if(this.recruiterModel.socialNetwork){
            let sociallist=this.fb.array([]);
          this.recruiterModel.socialNetwork.forEach(element=>{
            if(element.socialNwId){
              let setValue=this.fb.group({  
                socialNwId: this.socialNetworkDropdownList.filter(x=>x.id== element.socialNwId)[0].name,  
                name: element.name,  
              }) 
               sociallist.push(setValue);
            }
          });
            this.socialForm.setControl('socialNetworks',  sociallist)
        }
        this.recruiterService.recruiterSubject.next(this.recruiterModel);
        }
      },(err: HttpErrorResponse) => {
            this.toastr.error(err.message);
           })
    }
  }
   updateSocialNetwork(form:NgForm){
   this.recruiterModel.socialNetwork=[]
  if(this.socialForm.valid){
    this.socialForm.value.socialNetworks.forEach((element) => {
      this.socialNetwork.socialNwId=this.socialNetworkDropdownList.filter(x=>x.name== element.socialNwId)[0].id;
      this.socialNetwork.name=element.name;
      this.recruiterModel.socialNetwork.push(Object.assign({}, this.socialNetwork)); 
    });
  
     this.socialForm.value.socialNetworks=[];
     this.recruiterService.updateReqProfile(this.recruiterModel).subscribe((result:any)=>{
       this.getSocialNetwork(); 
       this.toastr.success(JSON.parse(result).message);
     },(err: HttpErrorResponse) => {
      this.toastr.error(err.message);
     })
   }
  }

   add(form:NgForm){
    if(form.valid){
      if(this.socialNetwork.name!="" && this.socialNetwork.name!= undefined){
       let social= this.socialNetworkDropdownList.filter(x=>x.name==this.socialNetwork.name)[0];
       this.recruiterModel.socialNetwork=[];
       this.socialNetworkName.socialNwId=social.id;
       this.recruiterModel.socialNetwork.push(this.socialNetworkName);
       this.socialNetwork=new SocialNetwork();
       this.socialNetworkName=new SocialNetwork();
      }
      else{
        
      }
    }
  }
}
