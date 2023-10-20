import {Request,Response} from "express";
import AbstractRequest from '@common/abstract/AbstractRequest';
import Joi, { Schema } from 'joi';
interface LoginRequestDto {
    email: string;
    password: string;
    remember: boolean;
    mobile: string;
}

export default class LoginRequest extends AbstractRequest {
    public loginValidateError = "";
    public loginRequest!: LoginRequestDto;
    
    constructor(req: Request, res: Response) {
        super(req,res)
        const {filters} = req.body;

        if(filters) {
            const validationResult = this.loginvalidate(filters);
            if(validationResult.error) {
                this.loginValidateError = validationResult.error.details[0].message;
            } else {
                this.loginRequest = filters as LoginRequestDto;                
            } 
        } else {
            this.loginValidateError = "Body không hợp lệ !"
        }
    }


    private loginvalidate(loginRequest: LoginRequestDto): Joi.ValidationResult {
        const schema: Schema = Joi.object({
            email: Joi.string().min(5).max(100).required().email(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
            remember: Joi.allow(),
            mobile: Joi.allow()
        });

        return schema.validate(loginRequest);
    }
}