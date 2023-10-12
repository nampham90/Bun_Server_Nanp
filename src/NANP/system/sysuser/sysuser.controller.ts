import { Request, Response} from 'express';
import SysUserFindByIdRequest from '@nanp/system/sysuser/dto/sysUserFindByIdRequest';
import sysuserRepo from './sysuser.repo';
import Sys_User from '@models/system/sys_user.model';
import { Result } from '@common/result/Result';
import { ErrorEnum } from '@common/enums/ErrorCodeEnum';
import SysUserRegistRequest from '@nanp/system/sysuser/dto/sysUserRegistRequest';
import SysUserFindAllRequest from './dto/sysUserFindAllRequest';

export default class SysUserController {

    async findAll(req: Request, res: Response): Promise<Response> {
        const reqUserSearch = new SysUserFindAllRequest(req,res);
        try {
            if(reqUserSearch.sysUserSearch_Error !== "") {
                return res.status(200).send(Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqUserSearch.sysUserSearch_Error));
            }
            const data = await sysuserRepo.retrieveAll(reqUserSearch.sysUserSearchDto,reqUserSearch.pageSize, reqUserSearch.pageNum);
            return res.status(200).send(Result.success(data));
        } catch (error) {
            return res.status(200).send(Result.failureCode(ErrorEnum.SYS_ERR_GLOBAL));
        }

    }

    async findById(req: Request, res: Response): Promise<Response> {
        const reqSysUserFindById = new SysUserFindByIdRequest(req,res);
        try {
            const user = await sysuserRepo.retrieveById(reqSysUserFindById.sysUserFindbyIdRequestDto.id);
            return res.status(200).send(Result.success(user));
        } catch (error) {
            return res.status(200).send(Result.failureCode(ErrorEnum.SYS_ERR_GLOBAL));
        }
    }

    async create(req: Request, res: Response) {
        const reqRegistUser = new SysUserRegistRequest(req,res);
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