import AbstractRequest from '@common/abstract/AbstractRequest';
import { ErrorCodeEnum, ErrorEnum } from '@common/enums/ErrorCodeEnum';
import {Request, Response} from "express";
import Joi , { Schema} from 'joi';
interface PermisstionIDDto{
    id: number
}
export default class SysPermisstionFindByIdRequest extends AbstractRequest {
    public permisstionId_Error = "";
    public permisstionIdDto!: PermisstionIDDto;
    constructor(req:Request,res:Response) {
        super(req,res)
        const {id} = req.body.filters;
        if(id) {
            const validateFindById = this.validateFindById(req.body.filters);
            if(validateFindById.error) {
                this.permisstionId_Error = validateFindById.error.details[0].message;
            } else {
                this.permisstionIdDto = req.body.filters as PermisstionIDDto
            }
        } else {
            const errorCode = new ErrorCodeEnum(ErrorEnum.SYS_ERR_JSON_REQUEST);
            this.permisstionId_Error = errorCode.getMsg();
        }
    }

    private validateFindById(permisstionId: PermisstionIDDto): Joi.ValidationResult {
        const schema : Schema = Joi.object({
            id: Joi.number().integer().required()
        });

        return schema.validate(permisstionId);
    }

}