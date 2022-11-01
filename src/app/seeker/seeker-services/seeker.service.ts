import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { PersonalInfo } from '../models/personal-info.model';
import { environment } from 'src/environments/environment';
import { JobSeekerModel } from '../models/job-seeker-model';

@Injectable({
    providedIn: 'root'
})
export class SeekerService {

    private messageSource = new BehaviorSubject<PersonalInfo>(new PersonalInfo);
    currentMessage = this.messageSource.asObservable();

    jobSeekerSubject:Subject<any>=new Subject<any>();
    jobSeekereMessage=this.jobSeekerSubject.asObservable();

    tickSubject:Subject<string>=new Subject<string>();
    tickMessage=this.tickSubject.asObservable();

    constructor(private httpClient: HttpClient) { }

    seekerLogin(email:string): Observable<JobSeekerModel> {
        return this.httpClient.get<JobSeekerModel>(environment.baseUrl+'co-api/seeker/register/'+email);
    }

    updateSeekerProfile(jobSeekerModel: JobSeekerModel): Observable<any> {
        return this.httpClient.patch<JobSeekerModel>(environment.baseUrl + 'co-api/seeker/register', jobSeekerModel, { responseType: 'text' as 'json' })
    }

    saveExperience(jobSeekerModel: JobSeekerModel):Observable<any>{
      return this.httpClient.patch<JobSeekerModel>(environment.baseUrl + 'co-api/seeker/register', jobSeekerModel, { responseType: 'text' as 'json' });
    }

    getExperienceList(email:string): Observable<JobSeekerModel> {
        return this.httpClient.get<JobSeekerModel>(environment.baseUrl + 'co-api/seeker/register/'+email);
    }

    getCompanyList(email:string): Observable<any> {
        return this.httpClient.get<any>(environment.baseUrl + 'co-api/company');
    }

    saveEducation(jobSeekerModel:JobSeekerModel): Observable<JobSeekerModel> {
        return this.httpClient.patch<JobSeekerModel>(environment.baseUrl+'co-api/seeker/register',jobSeekerModel,{ responseType: 'text' as 'json' })
    }
    getEducationList(email:string): Observable<JobSeekerModel> {
        return this.httpClient.get<JobSeekerModel>(environment.baseUrl +'co-api/seeker/register/'+email);
    }

    saveSkills(jobSeekerModel:JobSeekerModel): Observable<JobSeekerModel> {
        return this.httpClient.patch<JobSeekerModel>(environment.baseUrl+'co-api/seeker/register',jobSeekerModel,{responseType:'text' as 'json'})
    }

    getSkillList(email:string):Observable<JobSeekerModel>{
        return this.httpClient.get<JobSeekerModel>(environment.baseUrl +'co-api/seeker/register/'+email);
    }

    saveTraining(jobSeekerModel:JobSeekerModel): Observable<JobSeekerModel> {
        return this.httpClient.patch<JobSeekerModel>(environment.baseUrl+'co-api/seeker/register',jobSeekerModel);
    }

    getTrainingList(email: string): Observable<JobSeekerModel>{
        return this.httpClient.get<JobSeekerModel>(environment.baseUrl+'co-api/seeker/register/'+ email)
    }

    saveCertificate(jobSeekerModel:JobSeekerModel): Observable<JobSeekerModel> {
        return this.httpClient.patch<JobSeekerModel>(environment.baseUrl+'co-api/seeker/register',jobSeekerModel); 
    }
    getCertificateList(email: string): Observable<JobSeekerModel>{
        return this.httpClient.get<JobSeekerModel>(environment.baseUrl+'co-api/seeker/register/' + email)
    }
    saveAwards(jobSeekerModel:JobSeekerModel): Observable<JobSeekerModel> {
       return this.httpClient.patch<JobSeekerModel>(environment.baseUrl+'co-api/seeker/register',jobSeekerModel);
    }
    getawardsList(email: string): Observable<JobSeekerModel>{
        return this.httpClient.get<JobSeekerModel>(environment.baseUrl+'co-api/seeker/register/' + email)
    }

    saveLanguage(jobSeekerModel:JobSeekerModel): Observable<JobSeekerModel> {
        return this.httpClient.patch<JobSeekerModel>(environment.baseUrl+'co-api/seeker/register',jobSeekerModel);
    }
    getLanguageList(email: string): Observable<JobSeekerModel>{
        return this.httpClient.get<JobSeekerModel>(environment.baseUrl+'co-api/seeker/register/' + email)
    }

    saveContactDetails(jobSeekerModel:JobSeekerModel): Observable<JobSeekerModel> {
       return this.httpClient.patch<JobSeekerModel>(environment.baseUrl+'co-api/seeker/register',jobSeekerModel);
    }
    getContactDetailsList(email: string): Observable<JobSeekerModel>{
        return this.httpClient.get<JobSeekerModel>(environment.baseUrl+'co-api/seeker/register/' + email)
    }

    getMatchingJob(sekEmail:string,sort:string,pageNo:number):Observable<any>{
        return this.httpClient.get<any>(environment.baseUrl+'co-api/seeker/'+sekEmail+'/'+sort+'/'+pageNo+'/jobs');
    }
}