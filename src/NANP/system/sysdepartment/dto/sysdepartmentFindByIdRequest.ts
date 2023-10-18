import {Request, Response} from 'express';
import AbstractRequest from '../../../../common/abstract/AbstractRequest';
import Joi from 'joi';

export default class SysDepartmentFindByIdRequest extends AbstractRequest {
    public sysdepmentFindById_Error = "";
    public departmentId! : number;
    constructor(req:Request, res:Response) {
        super(req,res)

        const {department_id} = req.body.filters;
        const validate = this.validateFindById(department_id);
        if(validate.error) {
            this.sysdepmentFindById_Error = validate.error.details[0].message;
        } else {
            this.departmentId = department_id
        }
    }

    private validateFindById(reqDepartmentId: number): Joi.ValidationResult {
         const departmentId = Joi.number().integer().required();
         return departmentId.validate(reqDepartmentId);
    }
}