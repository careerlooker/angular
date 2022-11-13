import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseModel } from 'src/app/shared/models/base.model';
import { FilterModel } from '../../models/filter.model';
import { MatchingSeekerModel } from '../../models/matching-seeker.model';
import { RecruiterService } from '../../recruiter-services/recruiter.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent extends BaseModel implements OnInit {
  matchingSeekerModel: Array<MatchingSeekerModel> = new Array<MatchingSeekerModel>();
  filterModel:FilterModel=new FilterModel();
  constructor(private recruiterService: RecruiterService,
              private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params) {
        this.reqId = +params.reqId;
        this.jobId = +params.jobId;
        this.getMatchingSeeker();
      }
    });
  }
  getMatchingSeeker() {
    this.recruiterService.getRecruiterMatchingSeeker(this.reqId, this.jobId,this.pageNo,this.sort,this.filterModel).subscribe((result: any) => {
      if (result) {
        this.matchingSeekerModel = result;
      }
    })
  }
}


