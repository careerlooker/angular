import { BaseModel } from './base.model';

export class SkillsModel extends BaseModel{
    skillId: number;
    name: string;
    rating: number;
    description: string
}