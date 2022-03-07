import { Component, OnInit } from '@angular/core';
import {Event, NavigationStart,NavigationEnd,NavigationCancel,NavigationError, Router } from '@angular/router';
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  showLoadingIndicator=true;
   constructor(private router:Router){
    
    this.router.events.subscribe((routerEvent:Event)=>{
      if(routerEvent instanceof NavigationStart){
        this.showLoadingIndicator=true;
      }
      if(routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError){
        this.showLoadingIndicator=false;
      }
    })

   }

  ngOnInit() {
  }

}
