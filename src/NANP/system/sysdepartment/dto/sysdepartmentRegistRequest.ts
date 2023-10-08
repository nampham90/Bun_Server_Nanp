import AbstractRequest from "@common/abstract/AbstractRequest";
import Sys_Department from "@models/system/sys_department";
import {Request, Response} from 'express';
import Joi, { Schema } from 'joi';
interface Department {
    department_name: string;
    state: boolean;
    father_id: number;
    order_num: number
}
export default class SysDepartmentRegistRequest extends AbstractRequest {
    //public department_name: string = "";
    public department_Error: string = "";
    // public state: boolean = true;
    // public father_id: number = 0;
    // public order_num: number = 1;
    public department!: Sys_Department;
    constructor(req: Request,res:Response) {
        super(req,res)
        const {condition} = req.body;

        if(condition) {
            const validationResult = this.validateDepartment(condition);
            if (validationResult.error) {
                // Xử lý khi đối tượng không hợp lệ, ví dụ: gán lỗi vào department_nameError
                this.department_Error = validationResult.error.details[0].message;
            } else {
                // Đối tượng hợp lệ, gán giá trị từ condition vào các trường
                const department: Sys_Department = condition as Sys_Department;
                this.department = department;
                this.department.lang = this.lang;
            }
        }
    }

    private validateDepartment(department: Department): Joi.ValidationResult {
        const schema: Schema = Joi.object({
            department_name: Joi.string().min(1).max(50).required(),
            state: Joi.boolean().required(),
            father_id: Joi.number().integer().required(),
            order_num: Joi.number().integer().required(),
        });

        return schema.validate(department);
    }
}