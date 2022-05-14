import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/app/recruiter/my-account/models/user.model';
import { JobPosting } from '../my-listing/models/job-posting.model';
import { IndustryModel } from '../my-listing/models/industry.model';
import { FunctionalAreaModel } from '../my-listing/models/functional-area.model';
import { QualificationModel } from '../my-listing/models/qualification.model';
import { KeySkillsModel } from '../my-listing/models/key-skills.model';
import { SearchJob } from '../my-listing/models/search-job.model';
import { JobOperationModel } from '../my-listing/models/job-operation.model';
import { RecruiterModule } from '../recruiter.module';
import { RecruiterModel } from '../my-account/models/recruiter.model';
import { SocialNetwork } from '../my-account/models/social-network.model';



@Injectable({
    providedIn:'root'
})
export class RecruiterService{
    private messageSource = new BehaviorSubject<UserModel>(new UserModel);
    currentMessage = this.messageSource.asObservable();

    profileSubject:Subject<UserModel>=new Subject<UserModel>();
    profileMessage=this.profileSubject.asObservable();

    constructor(private httpClient:HttpClient){}

    recruiterLogin(credentials):Observable<UserModel>{
        return this.httpClient.post<UserModel>(environment.baseUrl+'co-api/recruiter/register',credentials);
    }
    
    getRecruiterDetails(email:string):Observable<RecruiterModel>{
        return this.httpClient.get<RecruiterModel>(environment.baseUrl+'co-api/recruiter/register/'+email);
    }

    getSocialDropdownList():Observable<SocialNetwork>
    {
        return this.httpClient.get<SocialNetwork>(environment.baseUrl+'co-api/socialnetwork');    
    }
    updateReqProfile(recruiterProfile:RecruiterModule):Observable<any>{
        return this.httpClient.patch<any>(environment.baseUrl+'co-api/recruiter/register',recruiterProfile,{responseType:'text' as 'json'})
    }

    changeMessage(userModel:UserModel){
        this.messageSource.next(userModel)
    }

    jobPostingSave(jobpost:JobPosting):Observable<any>{
        return this.httpClient.post<any>(environment.baseUrl+'co-api/recruiter/jobpost',jobpost,{responseType:'text' as 'json'});
    }


    getIndustryList():Observable<Array<IndustryModel>>{
       return this.httpClient.get<Array<IndustryModel>>(environment.baseUrl+'co-api/industry')
    }

    getfunctionalAreaList():Observable<Array<FunctionalAreaModel>>{ 
        return this.httpClient.get<Array<FunctionalAreaModel>>(environment.baseUrl+'co-api/funtional-area');
    }

    getQualificationList():Observable<Array<QualificationModel>>{
        return this.httpClient.get<Array<QualificationModel>>(environment.baseUrl+'co-api/qualification')
    }

    getKeySkills():Observable<Array<KeySkillsModel>>{
        return this.httpClient.get<Array<KeySkillsModel>>(environment.baseUrl+'co-api/key-skills')
    }

    getPostedJobList(page:number):Observable<Array<JobPosting>>{
        return this.httpClient.get<Array<JobPosting>>(environment.baseUrl+'co-api/recruiter/jobpost?p='+page);
    }

    jobSearch(search:SearchJob):Observable<Array<JobPosting>>{
        return this.httpClient.get<Array<JobPosting>>(environment.baseUrl+'co-api/recruiter/jobpost?p=5'+'&sd='+search.from+' 00:00:00' +'&ed='+search.to+' 00:00:00');
       //return this.httpClient.get<Array<JobPosting>>('http://18.188.204.127:8080/co-api/recruiter/jobpost?page=1&sd=2019-10-01 14:58:00.00&ed=2019-10-15 14:58:00.00')
    }

    getJobById(id:number):Observable<JobPosting>{
        return this.httpClient.get<JobPosting>(environment.baseUrl+'co-api/recruiter/jobpost/'+id)
    }

    publishJob(jobPublish:JobPosting):Observable<JobPosting>{
      return this.httpClient.patch<JobPosting>(environment.baseUrl+'co-api/recruiter/jobpost/pu',jobPublish);
    }

    deleteJob(jobDelete:JobOperationModel):Observable<JobPosting>{
        return this.httpClient.patch<JobPosting>(environment.baseUrl+'co-api/recruiter/jobpost/de',jobDelete);
      }

    copyJob(jobCopy:JobOperationModel):Observable<JobPosting>{
        return this.httpClient.patch<JobPosting>(environment.baseUrl+'co-api/recruiter/jobpost/co',jobCopy);
    }

    updateJob(jobUpdate:JobPosting):Observable<JobPosting>{
        return this.httpClient.patch<JobPosting>(environment.baseUrl+'co-api/recruiter/jobpost/up',jobUpdate);
    }
 
}