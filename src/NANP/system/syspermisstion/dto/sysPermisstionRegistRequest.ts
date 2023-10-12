import AbstractRequest from '../../../../common/abstract/AbstractRequest';

import { Request, Response} from "express";
import Joi, {Schema} from 'joi';
import Sys_Permission from '../../../../models/system/sys_permission';

export interface PremisstionDto {
    id?: number,
    menu_name: string;
    code: string;
    father_id:number;
    order_num: number;
    path: string;
    menu_type: string;
    visible: string;
    status: string;
    is_new_link: boolean;
    al_icon: string;
    icon: string;
}

export default class SysPremissionRegistRequest extends AbstractRequest {
    public sysPermissionRegist_Error:string = "";
    public permisstion!: Sys_Permission;
    constructor(req: Request, res: Response){
        super(req,res)
        const {filters} = req.body;

        if(filters) {
            const validatePermissionRegiste = this.validatePermission(filters);
            if(validatePermissionRegiste.error) {
                this.sysPermissionRegist_Error = validatePermissionRegiste.error.details[0].message;
            } else {
                this.permisstion = filters as Sys_Permission;
                this.permisstion.lang = this.lang;
            }

        }
    }
   
    private validatePermission(permission: PremisstionDto): Joi.ValidationResult {
        const schema: Schema = Joi.object({
            menu_name: Joi.string().min(1).max(50).required(),
            code: Joi.string().min(1).max(100).required(),
            father_id: Joi.number().integer().required(),
            order_num: Joi.number().integer().required(),
            path: Joi.string().min(1).max(200).required(),
            menu_type: Joi.string().length(1).required(),
            visible: Joi.string().length(1).required(),
            status: Joi.string().length(1).required(),
            is_new_link: Joi.boolean().required(),
            al_icon:  Joi.string().allow('', null),
            icon: Joi.string().required()

        })

        return schema.validate(permission);
    }

}