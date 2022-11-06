import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountriesModel } from '../models/countries.model';
import { environment } from 'src/environments/environment';
import { StatesModel } from '../models/states.model';
import { CityModel } from '../models/city.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserModel } from 'src/app/recruiter/my-account/models/user.model';

@Injectable({
    providedIn:'root'
})
export class SharedService {
    private approvalStageMessage = new BehaviorSubject("./assets/img/if_icons_user_.png");
    currentApprovalStageMessage = this.approvalStageMessage.asObservable();
    profileSubject:Subject<UserModel>=new Subject<UserModel>();
    profileMessage=this.profileSubject.asObservable();

    constructor(private httpClient:HttpClient){}
   
    updateApprovalMessage(message: any) {
        this.approvalStageMessage.next(message)
    }
   
    
    getAllCountries():Observable<Array<CountriesModel>>{
        return this.httpClient.get<Array<CountriesModel>>(environment.baseUrl+'co-api/country');
    }

    getAllStatesByCountryId(countryId:number):Observable<Array<StatesModel>>{
        return this.httpClient.get<Array<StatesModel>>(environment.baseUrl+'co-api/state/'+countryId);
    }

    getAllCitiesByStateId(stateId:number):Observable<Array<CityModel>>{
        return this.httpClient.get<Array<CityModel>>(environment.baseUrl+'co-api/city/'+stateId);
    }

    postFile(fileToUpload: File) {
        const formData: FormData = new FormData();
        formData.set('Image', fileToUpload);
        formData.set("ImageCaption","Kumar");

         return this.httpClient.post('http://localhost:55611/api/Image/UploadImage', formData) 
        
    }

    uploadPhoto(selectedFile:File,picType:string,reqId:number){
        const formData:FormData=new FormData();
        formData.append('file',selectedFile);
        return this.httpClient.post(environment.baseUrl+'co-api/uploadfile/'+picType+'/'+reqId,
        formData,{ responseType:'text' as 'json',reportProgress:true,observe:'events'});  
    }

    getAllCities():Observable<Array<CityModel>>{
      return  this.httpClient.get<Array<CityModel>>(environment.baseUrl+'co-api/city')
    }
}