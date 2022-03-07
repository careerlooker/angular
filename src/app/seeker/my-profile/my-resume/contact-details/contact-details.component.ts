import { Component, OnInit } from '@angular/core';
import { BaseModel } from 'src/app/shared/models/base.model';
import { ContactDetailsModel } from 'src/app/seeker/models/contact-details.model';
import { SeekerService } from 'src/app/seeker/seeker-services/seeker.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LanguageModel } from 'src/app/seeker/models/language.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent extends BaseModel implements OnInit {
  contactDetails:ContactDetailsModel=new ContactDetailsModel();
  contactDetailsList:Array<ContactDetailsModel>=new Array<ContactDetailsModel>();
  // addCout1:number=0;
  // addCout2:number=0;
  // addCout3:number=0;
  //fieldArray: Array<ContactDetailsModel> = [];
  //newAttribute: ContactDetailsModel = new ContactDetailsModel();

  // firstField = true;
  // firstFieldName = 'First Item name';
  // isEditItems: boolean;

constructor(private seekerService:SeekerService,
  private toastr:ToastrService,
  private router:Router) {
    super(); 
    this.sekId=+localStorage.getItem('seekId');
    this.actionType='add';
  }

  ngOnInit() { 
  
   // this.AddMore();
    this.getContactDetailsList();
  }

  onSubmit(form:NgForm){
    if(form.valid){
      let contList=new Array<ContactDetailsModel>();

      this.contactDetails.mediaId=form.value.mediaId;
      this.contactDetails.mediaName=form.value.mediaName;
      this.contactDetails.sekId=this.sekId;
      contList.push(this.contactDetails);

    //   this.contactDetails.mediaId=form.value.mediaId_1;
    //   this.contactDetails.mediaName=form.value.mediaName_1;
    //   this.contactDetails.sekId=this.sekId;
    //   contList.push(this.contactDetails);

    //   this.contactDetails.mediaId=form.value.mediaId_2;
    //   this.contactDetails.mediaName=form.value.mediaName_2;
    //   this.contactDetails.sekId=this.sekId;
    //   contList.push(this.contactDetails);

    //   this.contactDetails.mediaId=form.value.mediaId_3;
    //   this.contactDetails.mediaName=form.value.mediaName_3;
    //   this.contactDetails.sekId=this.sekId;
    //   contList.push(this.contactDetails);

    //   if(this.addCout1==5){
    //   this.contactDetails.mediaId=form.value.mediaId_5;
    //   this.contactDetails.mediaName=form.value.mediaName_5;
    //   this.contactDetails.sekId=this.sekId;
    //   contList.push(this.contactDetails);
    // }

    // if(this.addCout2==6){
    //   this.contactDetails.mediaId=form.value.mediaId_6;
    //   this.contactDetails.mediaName=form.value.mediaName_6;
    //   this.contactDetails.sekId=this.sekId;
    //   contList.push(this.contactDetails);
    // }

    // if(this.addCout3==7){
    //   this.contactDetails.mediaId=form.value.mediaId_7;
    //   this.contactDetails.mediaName=form.value.mediaName_7;
    //   this.contactDetails.sekId=this.sekId;
    //   contList.push(this.contactDetails);
    // }

      this.seekerService.saveContactDetails(contList,this.actionType).subscribe((result:any)=>{
        this.toastr.success(result.message);
        this.getContactDetailsList();
        this.isAdd=true;
        this.isUpdate=false;
        this.contactDetails=new ContactDetailsModel();
      })
    }
  }

  RowSelected(contactDetails:ContactDetailsModel){
    this.contactDetails=contactDetails;
    this.isAdd=false;
    this.isUpdate=true;
    this.actionType='edit';
  }

  getContactDetailsList(){
    this.seekerService.getContactDetailsList(this.sekId).subscribe((result:Array<ContactDetailsModel>)=>{
      this.contactDetailsList=result;
      if(this.contactDetailsList.length>0){
        this.seekerService.tickSubject.next('cd');
      }
     
    })
  }
  nextPage(){
      this.router.navigate(['/seeqem/my-profile/other-details'])
  }

  AddMore(){
    // if (this.fieldArray.length <= 3) {
    //   this.fieldArray.push({id:null,sekId:null,mediaId:"",mediaName:"Facebook"},
    //   {id:null,sekId:null,mediaId:"",mediaName:"Linked In"},
    //   {id:null,sekId:null,mediaId:"",mediaName:"Skype"},
    //   {id:null,sekId:null,mediaId:"",mediaName:"Other Social Media"}
    //  ) 
      
    // } else if(this.fieldArray.length <= 6) {
    //   this.fieldArray.push({id:null,sekId:null,mediaId:"",mediaName:"Other media name"});
    // }

    // if(this.addCout1==5) {
    //   this.addCout1=5;
    // }  
    // if(this.addCout2==6) {
    //   this.addCout2=6;
    // } 
    // if(this.addCout3==7) {
    //   this.addCout3=7;
    // }             
   }

  // Remove(){
  //   if(this.fieldArray.length>4){
  //     if(this.addCout1==5){
  //     this.fieldArray.pop();
  //     this.addCout1=0;
  //   }
  //   if(this.addCout2==6){
  //     this.fieldArray.pop();
  //     this.addCout2=0;
  //   }
  //   if(this.addCout3==7){
  //     this.fieldArray.pop();
  //     this.addCout3=0;
  //   }
  //   }
  // }

  // deleteFieldValue(index) {
  //   this.fieldArray.splice(index, 1);
  // }

  // onEditCloseItems() {
  //   this.isEditItems = !this.isEditItems;
  // }

}
