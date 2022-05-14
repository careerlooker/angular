import { JobCtcDetail } from "./job-ctc-detail.model";
import { JobDetail } from "./job-detail.model";
import { JobInterviewDetail } from "./job-interview-detail.model";
import { JobInterviewDetails } from "./job-interview-etails.model";

export class PostedJobs{
    jobId: number;
    jobDescription: string;
    aboutCompany: string;
    jobDetail:JobDetail;
    jobCtcDetail:JobCtcDetail;
    jobInterviewDetail:JobInterviewDetail;
    jobInterviewDetails:JobInterviewDetails;
}