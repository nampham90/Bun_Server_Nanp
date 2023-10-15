import {Request, Response} from 'express'
import AbstractRequest from '../../../../common/abstract/AbstractRequest';
import Joi, {Schema} from 'joi';

interface RequestDto {
    roleId: number,
    permissionIds: number[]
}
export default class SysRoleUpdatePermissionRoleRequest extends AbstractRequest {
    public sysroleUpdatePermissionRole_Error = "";

    public reqDto!: RequestDto;
    constructor(req: Request, res:Response) {
        super(req, res)

        const validate = this.validateUpdatePermissionRole(req.body.filters);
        if(validate.error) {
            this.sysroleUpdatePermissionRole_Error = validate.error.details[0].message;
        } else {
            this.reqDto = req.body.filters as RequestDto;
        }
    }

    private validateUpdatePermissionRole(reqDto: RequestDto): Joi.ValidationResult {

        const schema: Schema = Joi.object({
            roleId: Joi.number().integer().required(),
            permissionIds: Joi.array().items(Joi.number()).required()
        })

        return schema.validate(reqDto);
    }
}