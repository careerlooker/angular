import { AwardsModel } from "./awards.model";
import { CertificateModel } from "./certificate.model";
import { ContactDetailsModel } from "./contact-details.model";
import { EducationModel } from "./education.model";
import { ExperienceModel } from "./experience.model";
import { LanguageModel } from "./language.model";
import { OthersDetails } from "./others-details.model";
import { professionalSummary } from "./professional-summary";
import { PersonalInfo } from "./personal-info.model";
import { SkillsModel } from "./skills.model";
import { TrainingModel } from "./training.model";
import { BlockCompanies } from "./block-companies.model";

export class JobSeekerModel{
    id: number;
    email: string;
    password: string;
    personalInfo:PersonalInfo; 
    profSummary: professionalSummary;
    experience:ExperienceModel[];
    education:EducationModel[];
    skills:SkillsModel[];
    training:TrainingModel[];
    certification: CertificateModel[];
    awards:AwardsModel[];
    language:LanguageModel[];
    contactDetails:ContactDetailsModel[];
    blockCompanies:BlockCompanies [];
    otherDetails:OthersDetails;
    resume:string;
    createDate: string;
    updatedate: string;  
}
