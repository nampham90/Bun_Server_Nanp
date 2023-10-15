import {Request, Response} from 'express';
import AbstractRequest from '../../../../common/abstract/AbstractRequest';
import Sys_Role from '../../../../models/system/sys_role.model';
import Joi, {Schema} from 'joi';
interface RoleDto {
    id: number;
    role_name: string;
    role_desc: string;
}
export default class SysRoleUpdateRequest extends AbstractRequest {
    public sysRoleUpdate_Error = "";
    public role!: Sys_Role;
    constructor(req:Request, res:Response) {
        super(req,res)

        const validate = this.validateUpdate(req.body.filters);
        if(validate.error) {
            this.sysRoleUpdate_Error = validate.error.details[0].message;
        } else {
            this.role = req.body.filters as Sys_Role;
        }
    }

    private validateUpdate(role:RoleDto) : Joi.ValidationResult{

        const schema: Schema = Joi.object({
            id: Joi.number().integer().required(),
            role_name: Joi.string().min(3).max(50).required(),
            role_desc: Joi.string().max(255).required()
        })

        return schema.validate(role);
    }



}