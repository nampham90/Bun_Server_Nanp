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

         const {filters} = req.body;
         if(filters) {
            const validateFindById = this.validateFindById(filters);
            if(validateFindById.error) {
                this.sysUserFindById_Error = validateFindById.error.details[0].message;
            } else {
                this.sysUserFindbyIdRequestDto = filters as SysUserFindByIdRequestDto;
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