import Joi , {Schema} from 'joi';
import AbstractRequest from '../../../../common/abstract/AbstractRequest';
import {Request, Response} from 'express'
import Sys_User from '@models/system/sys_user.model';

interface UserDto{
    user_name: string;
    password: string;
    is_available: boolean;
    sex: number;
    mobile: string; // mobile
    email: string;// email
    department_id: number; // phòng ban
    ids: number[],// array role id
}

export default class SysUserRegistRequest extends AbstractRequest {
    public sysUserValidate_Error = "";
    public user! : Sys_User;
    public userDto! : UserDto;
    public department_id: number = -1; // department
    public ids: number[] = [];
    constructor(req: Request, res: Response) {
        super(req,res)
        const {filters} = req.body;
        if(filters) {
            const validateUserRegist = this.validateRegist(filters);
            if(validateUserRegist.error) {
                this.sysUserValidate_Error = validateUserRegist.error.details[0].message;
            } else {
                this.user = filters as Sys_User;// map user model
                this.userDto = filters as UserDto; // map userDto
                this.ids = this.userDto.ids; // get list role
                this.department_id = this.userDto.department_id; // get department
            }
        }
    }

    private validateRegist(user: UserDto) : Joi.ValidationResult {
        const schema: Schema = Joi.object({
            user_name: Joi.string().min(6).max(20).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
            is_available: Joi.boolean().required(),
            sex: Joi.number().integer().required(),
            mobile: Joi.string().max(12).pattern(new RegExp('^[0-9]{10}$')).required(),
            email: Joi.string().required().email(),
            department_id: Joi.number().integer().required(),
            ids: Joi.array().items(Joi.number())
        });
        return schema.validate(user);
    }
}