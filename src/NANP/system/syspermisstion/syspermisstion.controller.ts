
import {Request, Response} from 'express';
import SysPremissionRegistRequest from '@nanp/system/syspermisstion/dto/sysPermisstionRegistRequest';
import SysPermissionRepo from "./syspermisstion.repo";
import { Result } from '@common/result/Result';
import { ErrorEnum } from '@common/enums/ErrorCodeEnum';
export default class SysPermisstionController {

    async create(req:Request, res: Response) : Promise<Response> {
        const reqSysPermission = new SysPremissionRegistRequest(req,res);
        try {
            if(reqSysPermission.sysPermissionRegist_Error !== "") {
                return res.status(200).send(Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE,reqSysPermission.sysPermissionRegist_Error));
            }
            const regist = await SysPermissionRepo.save(reqSysPermission.permisstion);
            return res.status(200).send(Result.success(regist));
        } catch (error) {
            return res.status(200).send(Result.failureCode(ErrorEnum.SYS_ERR_GLOBAL));
        }
    }

    async findAll(req:Request, res: Response) : Promise<Response> {
        try {
            const lst = await SysPermissionRepo.retrieveAll();
            let data = {
                "total": lst.length,
                "list": lst
            }
            return res.status(200).send(Result.success(data));
        } catch (error) {
            return res.status(200).send(Result.failureCode(ErrorEnum.SYS_ERR_GLOBAL));
        }

    }

    async findFatherId(req: Request, res:Response) : Promise<void> {
        
    }

    async findById(req:Request, res: Response) : Promise<void> {

    }

    async update(req:Request, res: Response) : Promise<void> {

    }

    async delete(req:Request, res: Response) : Promise<void> {

    }

    async deleteAll(req:Request, res: Response) : Promise<void> {

    }
}