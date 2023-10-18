
import {Request, Response} from 'express'
import Joi, {Schema} from 'joi'
import AbstractRequest from '../../../../common/abstract/AbstractRequest';
import Sys_Department from '../../../../models/system/sys_department';
interface DepartmentDto {
    id: number;
    department_name: string;
    state: boolean;
    father_id: number;
    order_num: number;
}
export default class SysDepartmentUpdateRequest extends AbstractRequest {
    public sysdepartmentUpdate_Error = "";
    public sysDepartment!: Sys_Department;
    constructor(req:Request, res: Response) {
        super(req,res)

        const validate = this.validateUpdate(req.body.filters);
        if(validate.error) {
            this.sysdepartmentUpdate_Error = validate.error.details[0].message;
        } else {
            this.sysDepartment = req.body.filters as Sys_Department;
        }
    }

    private validateUpdate(reqDto: DepartmentDto) : Joi.ValidationResult {
        const schema: Schema = Joi.object({
            id: Joi.number().integer().required(),
            department_name: Joi.string().max(255).required(),
            state: Joi.boolean().required(),
            father_id: Joi.number().integer().required(),
            order_num: Joi.number().integer().required()
        })

        return schema.validate(reqDto); 
    }
}