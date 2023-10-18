import {Request,Response} from 'express';
import AbstractRequest from '@common/abstract/AbstractRequest';
import Joi from 'joi';
export default class Spmt00900FindByItemcdRequest extends AbstractRequest {
    public spmt00900FindByItemcd_Error = "";
    public itemcd : string = "";

    constructor(req:Request, res: Response) {
        super(req,res)
        const {itemcd} = req.body.filters
        const {error} = this.validateFindByItemcd(itemcd);
        if(error) {
            this.spmt00900FindByItemcd_Error = error.details[0].message;
        } else {
            this.itemcd = itemcd;
        }
    }

    
    private validateFindByItemcd(reqItemcd: string): Joi.ValidationResult{
         const itemcd = Joi.string().min(6).max(10).required();
         return itemcd.validate(reqItemcd);
    }

}
