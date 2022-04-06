import { BaseModel } from './base.model';

export class CertificateModel extends BaseModel{
    certId: number;
    certName: string;
    certMonth: string;
    certYear: string;
}