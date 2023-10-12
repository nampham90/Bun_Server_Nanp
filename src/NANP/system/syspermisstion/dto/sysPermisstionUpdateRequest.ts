import AbstractRequest from '@common/abstract/AbstractRequest';
import {Request, Response} from 'express';
import Joi , {Schema} from 'joi';
import { PremisstionDto } from './sysPermisstionRegistRequest';
import Sys_Permission from '@models/system/sys_permission';

export default class SysPermissionUpdateRequest extends AbstractRequest {
    public syspermisstionUpdate_Error = "";
    public SysPermisstion!: Sys_Permission;


    constructor(req: Request, res: Response){
        super(req,res)

        const validatePermissionUpdate = this.validatePermisstionUpdate(req.body.filters);
        if(validatePermissionUpdate.error) {
            this.syspermisstionUpdate_Error = validatePermissionUpdate.error.details[0].message;
        } else {
            this.SysPermisstion = req.body.filters as Sys_Permission;
        }
    }

    private validatePermisstionUpdate(permisstionIdDto: PremisstionDto): Joi.ValidationResult {
        const schema: Schema = Joi.object({
            id: Joi.number().integer().required(),
            menu_name: Joi.string().min(1).max(50).required(),
            code: Joi.string().min(1).max(100).required(),
            father_id: Joi.number().integer().required(),
            order_num: Joi.number().integer().required(),
            path: Joi.string().min(1).max(200).required(),
            menu_type: Joi.string().length(1).required(),
            visible: Joi.string().length(1).required(),
            status: Joi.string().length(1).required(),
            is_new_link: Joi.boolean().required(),
            al_icon: Joi.string().allow(''),
            icon: Joi.string().required()
        })

        return schema.validate(permisstionIdDto)
    }
}