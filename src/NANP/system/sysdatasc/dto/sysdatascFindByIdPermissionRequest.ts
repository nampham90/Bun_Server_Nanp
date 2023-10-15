import {Request,Response} from "express";
import AbstractRequest from '../../../../common/abstract/AbstractRequest';
import Joi, {Schema} from 'joi';

export default class SysDatascFindByIdPermissionRequest extends AbstractRequest {
    public sysDatascFindByIdPermission_Error = "";
    public permissionId! : number;
    constructor(req:Request, res:Response) {
        super(req,res)
        const {permission_id} = req.body.filters;
        if(this.abstract_error !== "") {
            this.sysDatascFindByIdPermission_Error = this.abstract_error;
        } else {
            const validate = this.validateFindByIdPermission(permission_id);
            if(validate.error) {
                this.sysDatascFindByIdPermission_Error = validate.error.details[0].message;
            } else {
                this.permissionId = permission_id;
            }
        }
    }

    private validateFindByIdPermission(perId:number): Joi.ValidationResult{
        const permissionId = Joi.number().integer().required();
        return permissionId.validate(perId);
    }
}