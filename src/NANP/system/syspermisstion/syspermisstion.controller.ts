
import {Request, Response} from 'express';
import SysPremissionRegistRequest from '@nanp/system/syspermisstion/dto/sysPermisstionRegistRequest';
import SysPermissionRepo from "./syspermisstion.repo";
import { Result } from '@common/result/Result';
import { ErrorEnum } from '@common/enums/ErrorCodeEnum';
import SysPermisstionFindAllRequest from '@nanp/system/syspermisstion/dto/sysPermisstionFindAllRequest';
import SysPermisstionFindByIdRequest from './dto/sysPermisstionFindByIdRequest';
import SysPermissionUpdateRequest from './dto/sysPermisstionUpdateRequest';
export default class SysPermisstionController {

    // create menu
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

    // findall menu 
    async findAll(req:Request, res: Response) : Promise<Response> {
        const reqSysPermissionFindAll = new SysPermisstionFindAllRequest(req,res);
        const lang = reqSysPermissionFindAll.lang;
        try {
            const lst = await SysPermissionRepo.retrieveAll(lang);
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

    // findById menu
    async findById(req:Request, res: Response) : Promise<Response> {
        const  reqPermisstionId = new SysPermisstionFindByIdRequest(req,res);
        try {
            if(reqPermisstionId.permisstionId_Error !== "") {
                return res.status(200).send(Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqPermisstionId.permisstionId_Error));
            }
            const permisstion = await SysPermissionRepo.retrieveById(reqPermisstionId.permisstionIdDto.id,reqPermisstionId.lang);
            return res.status(200).send(Result.success(permisstion));
        } catch (error) {
            return res.status(200).send(Result.failureCode(ErrorEnum.SYS_ERR_GLOBAL));
        }

    }

    // upate menu
    async update(req:Request, res: Response) : Promise<Response> {
        const reqPermisstionUpdate = new SysPermissionUpdateRequest(req,res);
        try {
            if(reqPermisstionUpdate.syspermisstionUpdate_Error !== "") {
                return res.status(200).send(Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE,reqPermisstionUpdate.syspermisstionUpdate_Error));
            }
            const updatePermisstion = await SysPermissionRepo.update(reqPermisstionUpdate.SysPermisstion, reqPermisstionUpdate.lang);
            return res.status(200).send(Result.success(updatePermisstion));
        } catch (error) {
            return res.status(200).send(Result.failureCode(ErrorEnum.SYS_ERR_GLOBAL));
        }
    }

    // delete menu
    async delete(req:Request, res: Response) : Promise<Response> {
        const reqPermisstionId = new SysPermisstionFindByIdRequest(req,res);
        try {
            if(reqPermisstionId.permisstionId_Error !== "") {
                return res.status(200).send(Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqPermisstionId.permisstionId_Error));
            }
            const deletePermisstion = await SysPermissionRepo.delete(reqPermisstionId.permisstionIdDto.id, reqPermisstionId.lang);
            return res.status(200).send(Result.success(deletePermisstion));
        } catch (error) {
            return res.status(200).send(Result.failureCode(ErrorEnum.SYS_ERR_GLOBAL));
        }

    }

    async deleteAll(req:Request, res: Response) : Promise<void> {

    }
}