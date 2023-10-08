import { Request, Response} from 'express';
import SysUserFindByIdRequest from '@nanp/system/sysuser/dto/sysUserFindByIdRequest';
import sysuserRepo from './sysuser.repo';
import Sys_User from '@models/system/sys_user.model';
import { Result } from '@common/result/Result';
import { ErrorEnum } from '@common/enums/ErrorCodeEnum';
import SysUserRegistRequest from '@nanp/system/sysuser/dto/sysUserRegistRequest';

export default class SysUserController {

    async findAll(req: Request, res: Response) {

    }

    async findById(req: Request, res: Response): Promise<Response> {
        const reqSysUserFindById = new SysUserFindByIdRequest(req,res);
        console.log(reqSysUserFindById.sysUserFindbyIdRequestDto.id)
        try {
            const user = await sysuserRepo.retrieveById(reqSysUserFindById.sysUserFindbyIdRequestDto.id);
            return res.status(200).send(Result.success(user));
        } catch (error) {
            return res.status(200).send(Result.failureCode(ErrorEnum.SYS_ERR_GLOBAL));
        }
    }

    async create(req: Request, res: Response) {
        const reqRegistUser = new SysUserRegistRequest(req,res);
        console.log(reqRegistUser.user);
        try {
            if(reqRegistUser.sysUserValidate_Error !== "") {
                return res.status(200).send(Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE,reqRegistUser.sysUserValidate_Error));
            }
            const user = await sysuserRepo.save(reqRegistUser.department_id,reqRegistUser.user,reqRegistUser.ids);
            return res.status(200).send(Result.success(user));
        } catch (error) {
            return res.status(200).send(Result.failureCode(ErrorEnum.SYS_ERR_GLOBAL));
        }
    }


    async update(req: Request, res: Response) {
        
    }


    async changePassword(req: Request, res: Response) {
        
    }

    async lockAccount(req: Request, res: Response) {
        
    }
}