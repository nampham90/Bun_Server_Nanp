import AbstractRequest from '@common/abstract/AbstractRequest';
import {Request, Response} from 'express';
import Sys_Datasc from "@models/system/sys_datasc.model";
import sysdatascRepo from '../sysdatasc.repo';
import Joi , {Schema} from 'joi';
import { DataScDto } from './sysdatascRegistListRequest';
import { ErrorCodeEnum, ErrorEnum } from '@common/enums/ErrorCodeEnum';

export default class SysDatascUpdateRequest extends AbstractRequest {
    public sysDatascUpdate_Error = "";
    public sysDatasc!: Sys_Datasc;
    constructor(req: Request, res: Response) {
        super(req,res)

        const {error} = this.validateUpdate(req.body.filters);
        if(error) {
            this.sysDatascUpdate_Error = error.details[0].message;
        } else {
            this.sysDatasc = req.body.filters as Sys_Datasc;
           
        }
    }

    private validateUpdate(reqDto: DataScDto) : Joi.ValidationResult{
        const scheam: Schema = Joi.object({
            id: Joi.number().integer().required(),
            title1: Joi.string().max(255).required(),
            title2: Joi.string().max(255).required(),
            location: Joi.number().integer().required(),
            status: Joi.boolean().required(),
        })

        return scheam.validate(reqDto);
    }

}