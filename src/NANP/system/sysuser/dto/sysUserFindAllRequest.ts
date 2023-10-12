import AbstractRequest from '@common/abstract/AbstractRequest';

import {Request, Response} from 'express';
import Joi, {Schema} from 'joi';
interface SysUserSearchDto {
    department_id?: number
}
export default class SysUserFindAllRequest extends AbstractRequest {

    public sysUserSearch_Error = "";
    public sysUserSearchDto! : SysUserSearchDto
    constructor(req: Request, res: Response) {
        super(req, res)

        const validateUserSearch = this.validateSysUserFindAll(req.body.filters);
        if(validateUserSearch.error) {
            this.sysUserSearch_Error = validateUserSearch.error.details[0].message;
        }else {
            this.sysUserSearchDto = req.body.filters as SysUserSearchDto;
            console.log(this.sysUserSearchDto);
        }
    }


    private validateSysUserFindAll(searchUser: SysUserSearchDto): Joi.ValidationResult {
        const schema: Schema = Joi.object({
            department_id: Joi.number().integer().required()
        })
        return schema.validate(searchUser);
    }

}