import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { SeekerService } from '../seeker-services/seeker.service';

@Component({
  selector: 'app-seeker-home',
  templateUrl: './seeker-home.component.html',
  styleUrls: ['./seeker-home.component.css']
})
export class SeekerHomeComponent implements OnInit {
@ViewChild(JobDetailsComponent)jobDetailsComponent:JobDetailsComponent;
  isProfileMainPage:boolean = false;
  isMyProfilePage:boolean = false;
  isToggle:boolean=true;
  constructor(private router: Router,
    private seekerService:SeekerService) {
    let activeUrl = this.router.url;
    if(activeUrl.indexOf('/my-profile') == -1){
        this.isMyProfilePage = false;
    }else{
      this.isMyProfilePage = true;
    }
   }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('object'));
    if(data){
      this.isToggle=data.isToggle;
      
    }else{
    this.seekerService.seekerNavigationToggleMessage.subscribe(toggle=>{
      if(toggle){
       this.isToggle=toggle;
      }
    })
  }
  }

}
