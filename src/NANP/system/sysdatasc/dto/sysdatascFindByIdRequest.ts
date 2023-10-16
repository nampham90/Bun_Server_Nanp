import {Request, Response} from 'express'
import AbstractRequest from '@common/abstract/AbstractRequest'
import Joi from 'joi';

export default class SysDatascFindByIdRequest extends AbstractRequest {
    public sysdatascFindById_Error = "";
    public datascId! : number;
    constructor(req:Request, res: Response) {
        super(req,res)
        const { datascId } = req.body.filters;
        const {error, value} = this.validateFindById(datascId);
        if(error) {
            this.sysdatascFindById_Error = error.details[0].message;
        } else {
            this.datascId = datascId;
        }
    }

    private validateFindById(reqDatascId: number) : Joi.ValidationResult{
       const datascId = Joi.number().integer().required(); 
       return datascId.validate(reqDatascId);
    }
}