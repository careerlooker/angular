import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BaseModel } from 'src/app/shared/models/base.model';
import { SharedService } from 'src/app/shared/services/shared.service';


@Component({
  selector: 'app-my-listing',
  templateUrl: './my-listing.component.html',
  styleUrls: ['./my-listing.component.css']
})
export class MyListingComponent extends BaseModel implements OnInit {

  constructor(private router: Router) {
      super();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.length > 34) {
          let match = event.url.substring(0, 33);
          if (match === '/reqem/my-lising/matching-profile') {
            this.isEnabled = true;
          } else {
            this.isEnabled = false;
          }
        }
        else{
          this.isEnabled = false;
        }
      }
    })
  }

  ngOnInit() {
  }
}
