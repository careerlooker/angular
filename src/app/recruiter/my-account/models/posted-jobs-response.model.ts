import { JobCtcInfo } from "./job-ctc-info.model";
import { JobInfo } from "./job-info.model";
import { JobInterviewInfo } from "./job-interview-info.model";

export class PostedJobsResponse{
    jobId:number;
    jobDescription: string;
    aboutCompany: string;
    companyName:string;
    jobInfo:JobInfo;
    jobCtcInfo:JobCtcInfo;
    jobInterviewInfo:JobInterviewInfo;
    jobVisibility: boolean;
    jobStatus: string;
    jobPostedDate:string;
    matchingPercentage:number;
    matchedSeekerProfile:number;
}