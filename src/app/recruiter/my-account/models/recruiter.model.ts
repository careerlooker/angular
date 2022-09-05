import { CompanyDetail } from "./company-detail.model";
import { Notification } from "./notification.model";
import { PersonalInformation } from "./personal-Information.model";
import { PostedJobs } from "./posted-jobs.model";
import { SocialNetwork } from "./social-network.model";


export class RecruiterModel{
    reqId: number;
    email: string;
    password: string;
    newPassword: string;
    jobVisibility: boolean;
    jobPostedDate: string;
    jobUpdatedDate: string;
    jobStatus: Boolean;
    personalInfo: PersonalInformation;
    notification: Notification;
    socialNetwork:SocialNetwork[];
    companyDetail: CompanyDetail;
    emailVerifyStatus: number;
    profileCompletion:number;
}
      
