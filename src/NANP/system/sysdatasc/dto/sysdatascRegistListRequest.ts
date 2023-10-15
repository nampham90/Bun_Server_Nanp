import  Joi, {Schema} from 'joi';
import {Request, Response} from "express"
import AbstractRequest from '../../../../common/abstract/AbstractRequest';
import Sys_Datasc from '../../../../models/system/sys_datasc.model';
export interface DataScDto {
    lang: string,
    title1: string;
    title2: string;
    location: number;
    status: boolean;
    permission_id: number;
}
export default class SysDatascRegistListRequest extends AbstractRequest {
    public sysDatascRegist_Error = "";
    public listdataInsert!: Sys_Datasc[];
    constructor(req: Request,res:Response) {
        super(req,res)
        const {lstdatascInsert} = req.body.filters;
        const {error, value} = this.validateSysDatascRegist(lstdatascInsert);

        if(error) {
            this.sysDatascRegist_Error = error.details[0].message;
        } else {
            this.listdataInsert = lstdatascInsert as Sys_Datasc[];
        }

    }

    private validateSysDatascRegist(listdataInsert: DataScDto[]): Joi.ValidationResult{
        const scheam: Schema = Joi.object({
            lang: Joi.string().length(2).required(),
            title1: Joi.string().required(),
            title2: Joi.string().required(),
            location: Joi.number().integer().required(),
            status: Joi.boolean().required(),
            permission_id: Joi.number().integer().required()
        })

        const datascListSchema =  Joi.array().items(scheam).required();

        return datascListSchema.validate(listdataInsert);
    }
}