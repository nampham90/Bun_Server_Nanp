
import {Request, Response} from "express"
import Joi, {Schema} from "joi";

interface AbstractRequestDto {
    pageNum: number;
    pageSize: number;
}
export default class AbstractRequest {
    public userId: number;
    public username: string;
    public lang: string;
    public pageNum: number;
    public pageSize: number;
    public abstract_error = "";
    constructor(req:Request, res:Response) {
        
        this.lang =  "vi";
        if(res.locals.language) {
            this.lang = res.locals.language;
        }
        this.userId = -1;
        this.username = "";
        if(res.locals.jwtPayload) {
            const {userId,username} = res.locals.jwtPayload;
            this.userId = userId;
            this.username = username;
        }
       
        this.pageNum = req.body.pageNum || 1;
        this.pageSize = req.body.pageSize || 10;

        if(this.pageNum === 0) this.pageNum = 1

        const validateAbstract = this.validateAbstract(req.body);
        if(validateAbstract.error) {
            this.abstract_error = validateAbstract.error.details[0].message;
        }
    }

    private validateAbstract(reqDto: AbstractRequestDto) : Joi.ValidationResult{
         const schema :Schema = Joi.object({
            pageNum: Joi.number().integer().min(1).required(),
            pageSize: Joi.number().integer().min(10).required(),
            filters: Joi.allow()
         })

         return schema.validate(reqDto);
    }
}