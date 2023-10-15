import {Request, Response} from 'express';
import AbstractRequest from '../../../../common/abstract/AbstractRequest';
import Joi , {Schema} from 'joi';
interface FindByIdDto {
    id: number;
}
export default class SysRoleFindByIdRequest extends AbstractRequest {
    public sysRoleFindById_Error = "";
    public roleId!: number;
    constructor(req: Request, res:Response) {
        super(req,res)
        const validate = this.validateFindById(req.body.filters);
        if(validate.error) {
            this.sysRoleFindById_Error = validate.error.details[0].message;
        } else {
            const reqDto:FindByIdDto = req.body.filters as FindByIdDto;
            this.roleId = reqDto.id;
        }
    }


    private validateFindById(reqDto: FindByIdDto) : Joi.ValidationResult {
        const schema: Schema = Joi.object({
            id: Joi.number().integer().required()
        })

        return schema.validate(reqDto)
    }
}