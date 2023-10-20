

import { ErrorEnum } from '@common/enums/ErrorCodeEnum'
import { Result } from '@common/result/Result';
import {Request, Response} from 'express';
import LoginRequest from "@nanp/spcm00101/dto/loginRequest";
import spcm00101Repo from './spcm00101.repo';
import {authConfig} from '@config/auth.config';
import * as jwt from 'jsonwebtoken';
import Sys_User from '@models/system/sys_user.model';
import Sys_Role from '@models/system/sys_role.model';
import AbstractController from '@common/abstract/AbstractController';
type T = string;
export default class Spmt00101Controller extends AbstractController<T>{
   async login(req:Request, res: Response) {
      await super.execute(res, async () => {
         const reqLogin = new LoginRequest(req,res);
             if(reqLogin.loginValidateError !== "") {
            return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqLogin.loginValidateError)
         }
         let kq = await spcm00101Repo.login(reqLogin.loginRequest);
   
         if(kq instanceof Sys_User) {
            let listRole: Sys_Role[] = kq.dataValues.sys_roles as Sys_Role[];
            let listRoleId :number[] = [];
            if(listRole.length > 0) {
               listRole.forEach(role=> {
                  listRoleId.push(role.id!);
               })
            }
            const {id, user_name, email} = kq;
            const strCode = await spcm00101Repo.roleOfPermisstion(id!);
            const payload = {
               userId: id,
               username: user_name,
               roles: listRoleId,
               permission: strCode,
               email: email
            };
            const newToken = jwt.sign(payload, authConfig.jwtSecret! , {expiresIn: '1000h',});
            return Result.success(newToken);
         } else {
            if(kq === 1) return Result.failureCode(ErrorEnum.SPCM00101_ERR_EMAIL_LOGIN);
            else if(kq === 3) return Result.failureCode(ErrorEnum.SPCM00101_ERR_AUTH_LOGIN);
            return Result.failureCode(ErrorEnum.SPCM00101_ERR_PASS_LOGIN);
         }
      })
   }
}