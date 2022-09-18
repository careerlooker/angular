import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/app/recruiter/my-account/models/user.model';
import { JobPosting } from '../my-listing/models/job-posting.model';
import { IndustryModel } from '../my-listing/models/industry.model';
import { FunctionalAreaModel } from '../my-listing/models/functional-area.model';
import { QualificationModel } from '../my-listing/models/qualification.model';
import { KeySkillsModel } from '../my-listing/models/key-skills.model';
import { SearchJob } from '../my-listing/models/search-job.model';
import { RecruiterModel } from '../my-account/models/recruiter.model';
import { SocialNetwork } from '../my-account/models/social-network.model';
import { PostedJobs } from '../my-account/models/posted-jobs.model';



@Injectable({
    providedIn:'root'
})
export class RecruiterService{
    private messageSource = new BehaviorSubject<UserModel>(new UserModel);
    currentMessage = this.messageSource.asObservable();

    profileSubject:Subject<UserModel>=new Subject<UserModel>();
    profileMessage=this.profileSubject.asObservable();

    recruiterSubject:Subject<any>=new Subject<any>();
    recruiterMessage=this.recruiterSubject.asObservable();

    editJobSubject:Subject<any>=new Subject<any>();
    editJobMessage=this.editJobSubject.asObservable();
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
    updateReqProfile(recruiterProfile:RecruiterModel):Observable<any>{
        return this.httpClient.patch<any>(environment.baseUrl+'co-api/recruiter/register',recruiterProfile,{responseType:'text' as 'json'})
    }
 
    changeMessage(userModel:UserModel){
        this.messageSource.next(userModel)
    }
   
    jobPostingSave(jobpost:any,reqId:number):Observable<any>{
        return this.httpClient.post<any>(environment.baseUrl+'co-api/recruiter/jobs/'+reqId,jobpost,{responseType:'text' as 'json'});
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

    jobSearch(search:SearchJob):Observable<any>{
        return this.httpClient.get<any>(environment.baseUrl+'co-api/recruiter/jobs/filter/'+search.reqId+'?reqId='+search.reqId+'&startDate='+search.startDate+'&endDate='+search.endDate);
    }
    

    getJobById(reqId:number):Observable<PostedJobs>{
        return this.httpClient.get<PostedJobs>(environment.baseUrl+'co-api/recruiter/jobs/'+reqId)
    }

    publishJob(jobPublish:any,reqId:number):Observable<JobPosting>{
      return this.httpClient.patch<JobPosting>(environment.baseUrl+'co-api/recruiter/'+reqId+'/jobPosts',jobPublish);
    }

    deleteJob(reqId:number,jobId:Array<number>):Observable<any>{
        let ids="?jobIds="
        for(let i=1; i<jobId.length;i++){
            if(i<jobId.length-1){
            ids+=jobId[i]+'&jobIds='
            }
            else{
            ids+=jobId[i];
            }
        }
        return this.httpClient.delete<any>(environment.baseUrl+'co-api/recruiter/jobs/'+reqId+ids);
      }

    copyJob(reqId:number,jobCopy:any):Observable<any>{
        return this.httpClient.post<any>(environment.baseUrl+'co-api/recruiter/jobs/copied/'+reqId,jobCopy,{responseType:'text' as 'json'});
    }

    updateJob(reqId:number,jobId:number,jobUpdate:any):Observable<any>{
        return this.httpClient.patch<any>(environment.baseUrl+'co-api/recruiter/jobs/'+reqId+'/'+jobId,jobUpdate,{responseType:'text' as 'json'});
    }
    getJobForEdit(reqId:number,jobId:number):Observable<any>{
        return this.httpClient.get<any>(environment.baseUrl+'co-api/recruiter/jobs/'+reqId+'/'+jobId);
    }
}