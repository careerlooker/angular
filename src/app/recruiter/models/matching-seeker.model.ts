import { AwardsModel } from "src/app/seeker/models/awards.model";
import { BlockCompanies } from "src/app/seeker/models/block-companies.model";
import { CertificateModel } from "src/app/seeker/models/certificate.model";
import { ContactDetailsModel } from "src/app/seeker/models/contact-details.model";
import { EducationModel } from "src/app/seeker/models/education.model";
import { ExperienceModel } from "src/app/seeker/models/experience.model";
import { LanguageModel } from "src/app/seeker/models/language.model";
import { OthersDetails } from "src/app/seeker/models/others-details.model";
import { PersonalInfo } from "src/app/seeker/models/personal-info.model";
import { professionalSummary } from "src/app/seeker/models/professional-summary";
import { SkillsModel } from "src/app/seeker/models/skills.model";
import { TrainingModel } from "src/app/seeker/models/training.model";


export class MatchingSeekerModel {
    id: number;
    email: string;
    password: string;
    resume: string;
    personalInfo: PersonalInfo;
    profSummary: professionalSummary;
    experience: ExperienceModel;
    education: EducationModel;
    skills: SkillsModel;
    training: TrainingModel;
    certification: CertificateModel;
    awards: AwardsModel;
    language: LanguageModel;
    contactDetails: ContactDetailsModel;
    blockCompanies: BlockCompanies;
    notificationDetails: any;
    otherDetails: OthersDetails
    statsDetails: string;
    profileStatus: string;
    profileMatchingPercentage: number;
    createDate: string;
    updatedDate: string;
}