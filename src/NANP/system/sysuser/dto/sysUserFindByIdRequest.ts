import AbstractRequest from '@common/abstract/AbstractRequest';

import {Request, Response} from 'express';
import Joi, {Schema} from 'joi';
interface SysUserFindByIdRequestDto {
    id: number;
}
export default class SysUserFindByIdRequest extends AbstractRequest {
    public sysUserFindById_Error = "";
    public sysUserFindbyIdRequestDto!: SysUserFindByIdRequestDto;

    constructor(req: Request, res: Response) {
         super(req, res)

         const {condition} = req.body;
         if(condition) {
            const validateFindById = this.validateFindById(condition);
            if(validateFindById.error) {
                this.sysUserFindById_Error = validateFindById.error.details[0].message;
            } else {
                this.sysUserFindbyIdRequestDto = condition as SysUserFindByIdRequestDto;
            }
         }
    }

    private validateFindById(sysUserFindbyidRequest: SysUserFindByIdRequestDto): Joi.ValidationResult {
        const schema: Schema = Joi.object({
            id: Joi.number().integer().required(),
        });
        return schema.validate(sysUserFindbyidRequest);
    }
}