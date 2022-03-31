import { BaseModel } from './base.model';

export class EducationModel extends BaseModel{
eduId:number;
college: string;
degree: string;
country: string;
state: string;
city: string;
graduateMonth: string;
graduateYear: number;
tillDate: number;
}