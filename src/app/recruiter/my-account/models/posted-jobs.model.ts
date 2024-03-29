import { JobCtcInfo } from "./job-ctc-info.model";
import { JobInfo } from "./job-info.model";
import { JobInterviewInfo } from "./job-interview-info.model";


export class PostedJobs{
    jobDescription: string;
    aboutCompany: string;
    companyName:string;
    jobInfo:JobInfo;
    jobCtcInfo:JobCtcInfo;
    jobInterviewInfo:JobInterviewInfo;
    jobVisibility: boolean;
    jobStatus: string
}
