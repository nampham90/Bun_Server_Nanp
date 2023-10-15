import { ErrorEnum } from '@common/enums/ErrorCodeEnum';
import { Result } from '@common/result/Result';
import { Request, Response } from 'express';

export default class AbstractController<T>{
    constructor(){}
    // thực thi process
    protected async execute(res: Response, callback:  () => Promise<Result<T>>) {
        try {
            const result = await callback();
            return  res.status(200).send(result);
        } catch (error) {
            return res.status(200).send(Result.failureCode(ErrorEnum.SYS_ERR_GLOBAL));
        }
    }
}