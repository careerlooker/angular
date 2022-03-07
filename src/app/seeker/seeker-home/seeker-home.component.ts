import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seeker-home',
  templateUrl: './seeker-home.component.html',
  styleUrls: ['./seeker-home.component.css']
})
export class SeekerHomeComponent implements OnInit {

  isProfileMainPage:boolean = false;
  isMyProfilePage:boolean = false;

  constructor(private router: Router) {
    let activeUrl = this.router.url;
    if(activeUrl.indexOf('/my-profile') == -1){
        this.isMyProfilePage = false;
    }else{
      this.isMyProfilePage = true;
    }
   }

  ngOnInit() {
  }

}
