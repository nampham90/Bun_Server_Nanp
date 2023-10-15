import {Request, Response} from "express"
import AbstractRequest from '../../../../common/abstract/AbstractRequest';

export default class SysRoloFindAllRequest extends AbstractRequest {
    constructor(req: Request, res:Response) {
        super(req,res)
    }
}