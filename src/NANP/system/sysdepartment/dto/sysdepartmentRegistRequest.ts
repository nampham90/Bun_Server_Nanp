import AbstractRequest from "@common/abstract/AbstractRequest";
import {Request, Response} from 'express';
import Joi, { Schema } from 'joi';
interface Department {
    department_name: string;
    state: boolean;
    father_id: number;
    order_num: number
}
export default class SysDepartmentRegistRequest extends AbstractRequest {
    public department_name: string = "";
    public department_Error: any;
    public state: boolean = true;
    public father_id: number = 0;
    public order_num: number = 1;
    constructor(req: Request,res:Response) {
        super(req,res)
        const {condition} = req.body;

        if(condition) {
            const validationResult = this.validateDepartment(condition);
            if (validationResult.error) {
                // Xử lý khi đối tượng không hợp lệ, ví dụ: gán lỗi vào department_nameError
                this.department_Error = validationResult.error;
            } else {
                // Đối tượng hợp lệ, gán giá trị từ condition vào các trường
                const department: Department = condition as Department;
                this.department_name = department.department_name;
                this.state = department.state;
                this.father_id = department.father_id;
                this.order_num = department.order_num;
            }
        }
    }

    private validateDepartment(department: Department): Joi.ValidationResult {
        const schema: Schema = Joi.object({
            department_name: Joi.string().min(6).max(255).required(),
            state: Joi.boolean().required(),
            father_id: Joi.number().integer().required(),
            order_num: Joi.number().integer().required(),
        });

        return schema.validate(department);
    }
}