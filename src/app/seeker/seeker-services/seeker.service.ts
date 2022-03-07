import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { SeekerModel } from '../models/seeker.model';
import { environment } from 'src/environments/environment';
import { ExperienceModel } from '../models/experience.model';
import { EducationModel } from '../models/education.model';
import { SkillsModel } from '../models/skills.model';
import { TrainingModel } from '../models/training.model';
import { CertificateModel } from '../models/certificate.model';
import { AwardsModel } from '../models/awards.model';
import { LanguageModel } from '../models/language.model';
import { ContactDetailsModel } from '../models/contact-details.model';
import { JobSeekerModel } from '../models/job-seeker-model';

@Injectable({
    providedIn: 'root'
})
export class SeekerService {

    private messageSource = new BehaviorSubject<SeekerModel>(new SeekerModel);
    currentMessage = this.messageSource.asObservable();

    profileSubject:Subject<SeekerModel>=new Subject<SeekerModel>();
    profileMessage=this.profileSubject.asObservable();

    tickSubject:Subject<string>=new Subject<string>();
    tickMessage=this.tickSubject.asObservable();

    constructor(private httpClient: HttpClient) { }

    seekerLogin(email:string): Observable<JobSeekerModel> {
        return this.httpClient.post<JobSeekerModel>(environment.baseUrl +'co-api/seeker/login/',{email:email});
    }

    updateSeekerProfile(seekerProfile: JobSeekerModel): Observable<any> {
        return this.httpClient.patch<any>(environment.baseUrl + 'co-api/seeker/register', seekerProfile, { responseType: 'text' as 'json' })
    }

    saveExperience(experience:Array<ExperienceModel>,actionType:string):Observable<any>{
        if(actionType=='add'){
            return this.httpClient.post<any>(environment.baseUrl + 'co-api/seeker/employer', experience, { responseType: 'text' as 'json' });
        }else{
            return this.httpClient.patch<any>(environment.baseUrl + 'co-api/seeker/employer', experience, { responseType: 'text' as 'json' });   
        }
    }

    getExperienceList(sekId:number): Observable< Array<ExperienceModel>> {
        return this.httpClient.get< Array<ExperienceModel>>(environment.baseUrl + 'co-api/seeker/employer/'+sekId);
    }

    saveEducation(education:Array<EducationModel>,actionType:string): Observable<any> {
        if(actionType=='add'){
             return this.httpClient.post<any>(environment.baseUrl+'co-api/seeker/education',education,{ responseType: 'text' as 'json' })
        }else{
            return this.httpClient.patch<any>(environment.baseUrl+'co-api/seeker/education',education,{ responseType: 'text' as 'json' })
        }
    }

    getEducationList(sekId:number): Observable<Array<EducationModel>> {
        return this.httpClient.get<Array<EducationModel>>(environment.baseUrl +'co-api/seeker/education/'+sekId);
    }

    saveSkills(skills:Array<SkillsModel>,actionType:string): Observable<any> {
        if(actionType=='add'){
            return this.httpClient.post<any>(environment.baseUrl+'co-api/seeker/skills',skills,{responseType:'text' as 'json'})
        }else{
            return this.httpClient.patch<Array<any>>(environment.baseUrl+'co-api/seeker/skills',skills,{responseType:'text' as 'json'})
        }
    }

    getSkillList(sekId:number):Observable<Array<SkillsModel>>{
        return this.httpClient.get<Array<SkillsModel>>(environment.baseUrl +'co-api/seeker/skills/'+sekId);
    }

    saveTraining(training:Array<TrainingModel>,actionType:string): Observable<any> {
        if(actionType='add'){
            return this.httpClient.post<any>(environment.baseUrl+'co-api/seeker/training',training);
        }else{
            return this.httpClient.patch<any>(environment.baseUrl+'co-api/seeker/training',training);
        }
    }
      getTrainingList(id: number): Observable<Array<TrainingModel>>{
        return this.httpClient.get<Array<TrainingModel>>(environment.baseUrl+'co-api/seeker/training/' + id)
    }

   
    saveCertificate(certificate:Array<CertificateModel>,actionType:string): Observable<any> {
        if(actionType='add'){
            return this.httpClient.post<any>(environment.baseUrl+'co-api/seeker/certification',certificate);
        }else{
            return this.httpClient.patch<any>(environment.baseUrl+'co-api/seeker/certification',certificate);
        }
    }
    getCertificateList(id: number): Observable<Array<CertificateModel>>{
        return this.httpClient.get<Array<CertificateModel>>(environment.baseUrl+'co-api/seeker/certification/' + id)
    }

  
    saveAwards(awards:Array<AwardsModel>,actionType:string): Observable<any> {
        if(actionType='add'){
            return this.httpClient.post<any>(environment.baseUrl+'co-api/seeker/award',awards);
        }else{
            return this.httpClient.patch<any>(environment.baseUrl+'co-api/seeker/award',awards);
        }
    }
    getawardsList(id: number): Observable<Array<AwardsModel>>{
        return this.httpClient.get<Array<AwardsModel>>(environment.baseUrl+'co-api/seeker/award/' + id)
    }

  

    saveLanguage(language:Array<LanguageModel>,actionType:string): Observable<any> {
        if(actionType='add'){
            return this.httpClient.post<any>(environment.baseUrl+'co-api/seeker/language',language);
        }else{
            return this.httpClient.patch<any>(environment.baseUrl+'co-api/seeker/language',language);
        }
    }
    getLanguageList(id: number): Observable<Array<LanguageModel>>{
        return this.httpClient.get<Array<LanguageModel>>(environment.baseUrl+'co-api/seeker/language/' + id)
    }


    saveContactDetails(contactDetails:Array<ContactDetailsModel>,actionType:string): Observable<any> {
        if(actionType='add'){
            return this.httpClient.post<any>(environment.baseUrl+'co-api/seeker/contact',contactDetails);
        }else{
            return this.httpClient.patch<any>(environment.baseUrl+'co-api/seeker/contact',contactDetails);
        }
    }
    getContactDetailsList(id: number): Observable<Array<ContactDetailsModel>>{
        return this.httpClient.get<Array<ContactDetailsModel>>(environment.baseUrl+'co-api/seeker/contact/' + id)
    }
}