import { Component, OnInit } from '@angular/core';
import { SeekerService } from '../seeker-services/seeker.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  pi: boolean=false;
  ps: boolean=false;
  ed: boolean=false;
  ex: boolean=false;
  ss: boolean=false;
  tn: boolean=false;
  ca: boolean=false;
  lg: boolean=false;
  cd: boolean=false;
  od: boolean=false;
  rd: boolean=false;
  ad: boolean=false;

  constructor(private seekerService:SeekerService) { }

  ngOnInit() {
    this.tickStatus();
  }

  tickStatus(){
    this.seekerService.tickMessage.subscribe((result:any)=>{
     if(result=='pi'){this.pi=true;}
     if(result=='ps'){this.ps=true;}
     if(result=='ed'){this.ed=true;}
     if(result=='ex'){this.ex=true;}
     if(result=='ss'){this.ss=true;}
     if(result=='tn'){this.tn=true;}
     if(result=='ca'){this.ca=true;}
     if(result=='lg'){this.lg=true;}
     if(result=='cd'){this.cd=true;}
     if(result=='od'){this.od=true;}
     if(result=='rd'){this.rd=true;}
     if(result=='ad'){this.ad=true;}
    })
  }

}
