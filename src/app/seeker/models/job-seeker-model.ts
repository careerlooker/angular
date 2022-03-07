import { AwardsModel } from "./awards.model";
import { CertificateModel } from "./certificate.model";
import { ContactDetailsModel } from "./contact-details.model";
import { EducationModel } from "./education.model";
import { ExperienceModel } from "./experience.model";
import { LanguageModel } from "./language.model";
import { OthersDetails } from "./others-details.model";
import { professionalSummary } from "./professional-summary";
import { SeekerModel } from "./seeker.model";
import { SkillsModel } from "./skills.model";
import { TrainingModel } from "./training.model";

export class JobSeekerModel{
    id: number;
    email: string;
    password: string;
    personalInfo:SeekerModel; 
    profSummary: professionalSummary;
    experience:ExperienceModel;
    education:EducationModel;
    skills:SkillsModel;
    training:TrainingModel;
    certification: CertificateModel;
    awards:AwardsModel;
    language:LanguageModel;
    contactDetails:ContactDetailsModel;
    otherDetails:OthersDetails ;
    createDate: string;
    updatedate: string;  
}