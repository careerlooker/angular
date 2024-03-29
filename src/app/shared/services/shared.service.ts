import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CountriesModel } from '../models/countries.model';
import { environment } from 'src/environments/environment';
import { StatesModel } from '../models/states.model';
import { CityModel } from '../models/city.model';
import { Observable } from 'rxjs';



@Injectable({
    providedIn:'root'
})
export class SharedService {
   
    constructor(private httpClient:HttpClient){}
   
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

    uploadPhoto(selectedFile:File,type:string){
        const formData:FormData=new FormData();
        formData.append('file',selectedFile);
    
        return this.httpClient.post(environment.baseUrl+'co-api/uploadfile/'+type,formData,{ reportProgress:true,observe:'events'}); 
      // return this.httpClient.post('http://localhost:55611/api/Image/UploadImage',formData); 

    }
 
    getAllCities():Observable<Array<CityModel>>{
      return  this.httpClient.get<Array<CityModel>>(environment.baseUrl+'co-api/city')
    }
}