import {Request, Response} from 'express';
import { LoginRequestDto } from './dto/loginRequestDto';
import { Result } from '@common/result/Result';
import { ErrorEnum } from '@common/enums/ErrorCodeEnum';


export function login(req: Request, res: Response) : Response {
   const reqLogin = new LoginRequestDto(req);
   console.log(reqLogin.getPassword() + "/" + reqLogin.getUsername());
   return res.status(200).send(Result.failureCode(ErrorEnum.SYS_ERR_CREATE_FAILED));
}

