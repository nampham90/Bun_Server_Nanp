import AbstractRequest  from '@common/abstract/AbstractRequest';
import Sys_Role from '@models/system/sys_role.model';

import {Request, Response} from 'express';
import Joi , {Schema} from 'joi';
export interface RoleDto {
    role_name: string;
    role_desc: string;
}
export default class SysRoleRegistRequest extends AbstractRequest {
    public sysRoleRegist_Error = "";

    public role!: Sys_Role;
    constructor(req: Request, res:Response){
        super(req, res)
        const validate = this.validateRegist(req.body.filters);
        if(validate.error) {
            this.sysRoleRegist_Error = validate.error.details[0].message;
        } else {
            this.role = req.body.filters as Sys_Role;
        }
    }

    private validateRegist(role: RoleDto) : Joi.ValidationResult {
        const scheme : Schema = Joi.object({
            role_name: Joi.string().min(3).max(50).required(),
            role_desc: Joi.string().max(255).required()
        })

        return scheme.validate(role);
    }
}