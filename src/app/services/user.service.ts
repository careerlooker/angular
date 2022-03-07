import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignupModel } from '../models/signup.model';
import { Observable,Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { JobSeekerModel } from '../seeker/models/job-seeker-model';


@Injectable({
    providedIn:'root'
})
export class UserService{
    userSubject:Subject<any>=new Subject<any>();
    constructor(private httpClient:HttpClient){}

    signUp(jobSeekerModel:JobSeekerModel,registerType:string):Observable<any>{
        const headers = new HttpHeaders({'No-Auth':environment.NoAuth,'Content-Type':environment.Accept});
        if(registerType=='recruiter'){
        return this.httpClient.post<any>(environment.baseUrl+'recruiter/register',SignupModel, {headers:headers, responseType: 'text'as 'json'})
        }
        else{
            return this.httpClient.post<any>(environment.baseUrl+'seeker/register',jobSeekerModel, {headers:headers, responseType: 'text'as 'json'})
        }
    }

    getToken(loginPayload:any):Observable<any>{
          const reqHeader = new HttpHeaders({
              'Authorization': environment.apiKey,
              'Content-Type': environment.contentType,
              'Accept':environment.Accept,
              'No-Auth':environment.NoAuth
            });
        return this.httpClient.post<any>(environment.baseUrl+'oauth/token',loginPayload,{headers:reqHeader});
    }
}