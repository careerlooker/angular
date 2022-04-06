import { BaseModel } from './base.model';

export class AwardsModel extends BaseModel{
    awardId: number;
    awardName: string;
    awardMonth: string;
    awardYear: string;
}