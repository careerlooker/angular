import { JobCtcInfo } from "src/app/recruiter/my-account/models/job-ctc-info.model";
import { JobInfo } from "src/app/recruiter/my-account/models/job-info.model";
import { JobInterviewInfo } from "src/app/recruiter/my-account/models/job-interview-info.model";

export class MatchingJobModel {
    jobId: number;
    reqId: number;
    jobDescription: string;
    companyName: string;
    aboutCompany: string;
    jobInfo:JobInfo;
    jobCtcInfo:JobCtcInfo;
    jobInterviewInfo:JobInterviewInfo;
    jobAppliedInfo : string;
    jobVisibility : string;
    jobPostedDate : string;
    jobUpdatedDate : string;
    jobStatus : string;
    isJobDeleted : boolean;
    matchingPercentage : number;
    jobsAppliedBySeeker:boolean;
}