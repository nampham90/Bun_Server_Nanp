import { Request, Response} from 'express';
import SysUserFindByIdRequest from '@nanp/system/sysuser/dto/sysUserFindByIdRequest';
import sysuserRepo from './sysuser.repo';
import Sys_User from '@models/system/sys_user.model';
import { Result } from '@common/result/Result';
import { ErrorEnum } from '@common/enums/ErrorCodeEnum';
import SysUserRegistRequest from '@nanp/system/sysuser/dto/sysUserRegistRequest';
import SysUserFindAllRequest from './dto/sysUserFindAllRequest';
import { PageInfo } from '@common/pageHelper/PageInfo';
import AbstractController from '@common/abstract/AbstractController';
import SysUserChangePassRequest from './dto/sysUserChangePassRequest';
import Sys_Permission from '@models/system/sys_permission';

type T = Sys_User | PageInfo<Sys_User> | null | number | boolean | void | Sys_Permission[]
export default class SysUserController extends AbstractController<T> {

    async findAll(req: Request, res: Response) {
        await super.execute(res, async ()=> {
            const reqUserSearch = new SysUserFindAllRequest(req,res);
            if(reqUserSearch.sysUserSearch_Error !== "")
              return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqUserSearch.sysUserSearch_Error);
            const data = await sysuserRepo.retrieveAll(reqUserSearch.sysUserSearchDto,reqUserSearch.pageSize, reqUserSearch.pageNum);
            return Result.success(data);
        })
    }

    async findById(req: Request, res: Response) {
        await super.execute(res, async () => {
            const reqSysUserFindById = new SysUserFindByIdRequest(req,res);
            const user = await sysuserRepo.retrieveById(reqSysUserFindById.sysUserFindbyIdRequestDto.id);
            if(!user) return Result.failureCode(ErrorEnum.SYS_USER_ERR_ISNULL);
            return Result.success(user);
        })
    }

    async create(req: Request, res: Response) {
        await super.execute(res, async () => {
            const reqRegistUser = new SysUserRegistRequest(req,res);
            if(reqRegistUser.sysUserValidate_Error !== "")
                return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE,reqRegistUser.sysUserValidate_Error);
            const user = await sysuserRepo.save(reqRegistUser.department_id,reqRegistUser.user,reqRegistUser.ids);
            return Result.success(user)
        })
    }

    async userPermission(req:Request, res: Response) {
        await super.execute(res, async () => {
            const reqRegistUser = new SysUserRegistRequest(req,res);
            const listPermission = await sysuserRepo.userPermission(reqRegistUser.userId, reqRegistUser.lang);
            return Result.success(listPermission);
        })
    }


    async update(req: Request, res: Response) {
        // await super.execute(res, async () => {

        // })
    }


    async changePassword(req: Request, res: Response) {
        await super.execute(res, async () => {
            const reqChangePass = new SysUserChangePassRequest(req,res);
            if(reqChangePass.sysuserchangepass_error !== "")
               return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqChangePass.sysuserchangepass_error);
            const changepass = await sysuserRepo.changePassword(reqChangePass.userId, reqChangePass.changePassDto.newPassword, reqChangePass.changePassDto.oldPassword);
            if (changepass !== 0 ) {
                if(changepass === 98)
                   return Result.failureCode(ErrorEnum.SYS_USER_ERR_CHANGE_PASS_98);
                return Result.failureCode(ErrorEnum.SYS_USER_ERR_CHANGE_PASS_99);
            } 
            return Result.success()
        })
    }

    async lockAccount(req: Request, res: Response) {
        // await super.execute(res, async () => {

        // })
    }
}