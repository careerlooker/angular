import { JobCtcInfo } from "./job-ctc-info.model";
import { JobInfo } from "./job-info.model";
import { JobInterviewInfo } from "./job-interview-info.model";


export class PostedJobs{
    jobId: number;
    jobDescription: string;
    aboutCompany: string;
    jobInfo:JobInfo;
    jobCtcInfo:JobCtcInfo;
    jobInterviewInfo:JobInterviewInfo;
    jobVisibility: boolean;
    jobPostedDate: string;
    jobStatus: string
}
