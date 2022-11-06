import { Component, OnInit } from '@angular/core';
import { BaseModel } from 'src/app/shared/models/base.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';
import { MatchingSeekerModel } from '../models/matching-seeker.model';
import { RecruiterModel } from '../my-account/models/recruiter.model';
import { RecruiterService } from '../recruiter-services/recruiter.service';

@Component({
  selector: 'app-auto-match-profile',
  templateUrl: './auto-match-profile.component.html',
  styleUrls: ['./auto-match-profile.component.css']
})
export class AutoMatchProfileComponent implements OnInit {
  
  constructor(
    private sharedService: SharedService) {  }

  ngOnInit() {
    
  }

}
