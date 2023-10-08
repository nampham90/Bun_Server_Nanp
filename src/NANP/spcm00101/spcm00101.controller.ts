

import { ErrorEnum } from '@common/enums/ErrorCodeEnum'
import { Result } from '@common/result/Result';
import {Request, Response} from 'express';
import LoginRequest from "@nanp/spcm00101/dto/loginRequest";
import spcm00101Repo from './spcm00101.repo';
import {authConfig} from '@config/auth.config';
import * as jwt from 'jsonwebtoken';
export default class Spmt00101Controller {
   async login(req:Request, res: Response) :Promise<Response>{
      const reqLogin = new LoginRequest(req,res);
      try {
         if(reqLogin.loginValidateError !== "") {
            return res.status(200).send(Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqLogin.loginValidateError));
         }
         let user = await spcm00101Repo.login(reqLogin.loginRequest);
         if(user) {
            const {id, user_name,} = user;
            const payload = {
               userId: id,
               username: user_name,
               role: 'user',
             };
            const newToken = jwt.sign(payload, authConfig.jwtSecret! , {expiresIn: '10h',});
            return res.status(200).send(Result.success(newToken));
         } else {
            return res.status(200).send(Result.failureCode(ErrorEnum.SPCM00101_ERR_LOGIN));
         }
         
      } catch (error) {
         return res.status(200).send(Result.failureCode(ErrorEnum.SYS_ERR_GLOBAL));
      }
   }
}