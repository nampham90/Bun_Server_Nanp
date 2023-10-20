import AbstractRequest from '@common/abstract/AbstractRequest';
import {Request, Response} from 'express';
import Joi, {Schema} from 'joi';
interface ChangePassDto {
    newPassword: string;
    oldPassword: string;
}

export default class SysUserChangePassRequest extends AbstractRequest {
    public sysuserchangepass_error = "";
    public changePassDto!: ChangePassDto;
    constructor(req:Request, res: Response) {
        super(req,res)
        const {error} = this.validateChangepass(req.body.filters);
        if(error) {
            this.sysuserchangepass_error = error.details[0].message;
        } else {
            this.changePassDto = req.body.filters as ChangePassDto;
        }
    }

    private validateChangepass(reqDto: ChangePassDto) : Joi.ValidationResult {
        const schema : Schema = Joi.object({
            oldPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
            newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required()
        })

        return schema.validate(reqDto);
    }
}