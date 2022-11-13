import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  imgUrl:any='./assets/img/if_icons_user_.png';
  constructor(private router:Router,private sharedService:SharedService) { }

  ngOnInit() {
    this.sharedService.currentApprovalStageMessage.subscribe(msg=>{this.imgUrl=msg})
  }

    logout(){
      localStorage.removeItem('userToken');
      localStorage.removeItem('credentials');
      localStorage.removeItem('object');
      this.router.navigate(['/']);
    }
}
