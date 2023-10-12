import AbstractRequest from '@common/abstract/AbstractRequest';

import {Request, Response} from 'express';

export default class SysPermisstionFindAllRequest extends AbstractRequest {

    constructor(req:Request,res:Response) {
        super(req,res)
    }

}