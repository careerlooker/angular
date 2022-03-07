import { BaseModel } from './base.model';

export class ExperienceModel extends BaseModel{
    expid:number;
    employerName: string;
    role:string;
    country: string;
    state: string;
    city: string;
    joiningYear: number;
    joiningMonth: string;
    resigningYear: number;
    resigningMonth: string;
   // responsibilities: string;
    presentEmployer: number
}