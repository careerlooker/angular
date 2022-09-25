import { Component,Input, Output,EventEmitter, OnInit } from '@angular/core';
import {HttpEventType} from '@angular/common/http';
import { SharedService } from '../../services/shared.service';
import { RecruiterService } from 'src/app/recruiter/recruiter-services/recruiter.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent{
  message:string='';
  selectedFile=null;
  uploadResponse:any;
  @Input() imgUrl:any;
  id:number=0;
  picType:string;
  constructor(private sharedService:SharedService,private recService:RecruiterService) { }
  
  onFileSelected(event:any){
    this.selectedFile=<File>event.target.files[0];
      if (this.selectedFile.length === 0)
        return;
      var mimeType = this.selectedFile.type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        this.selectedFile=null;
        return;
      }
      else{
        this.message='';
      }
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imgUrl.image=event.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }
  onUpload(){
    if(this.selectedFile==null)
      return;
      else{
    this.sharedService.uploadPhoto(this.selectedFile,this.imgUrl.picType,this.imgUrl.id)
    .subscribe(event=>{
       if(event.type===HttpEventType.UploadProgress){
         this.uploadResponse='Upload Progress: '+Math.round(event.loaded/event.total*100)+' %';
         if(this.uploadResponse=="Upload Progress: 100 %"){
          if(this.imgUrl.buttonText=='Upload Your Photo')
          this.recService.profileSubject.next(this.imgUrl.image);
         }
       }
       else if(event.type===HttpEventType.Response){
       }
     });
    }
   }
}
