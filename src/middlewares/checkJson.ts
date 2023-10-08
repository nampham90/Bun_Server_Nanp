import { ErrorEnum } from '@common/enums/ErrorCodeEnum';
import { Result } from '@common/result/Result';
import { Request, Response, NextFunction } from 'express';

export function handleJsonError(error: any, req: Request, res: Response, next: NextFunction) {
  if (error instanceof SyntaxError && 'body' in error) {
    res.status(400).send(Result.failureCode(ErrorEnum.SYS_ERR_JSON_REQUEST));
  } else {
    next();
  }
}