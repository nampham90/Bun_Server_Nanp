
import {Request, Response} from 'express';
import SysPremissionRegistRequest from '@nanp/system/syspermisstion/dto/sysPermisstionRegistRequest';
import SysPermissionRepo from "./syspermisstion.repo";
import { Result } from '@common/result/Result';
import { ErrorEnum } from '@common/enums/ErrorCodeEnum';
import SysPermisstionFindAllRequest from '@nanp/system/syspermisstion/dto/sysPermisstionFindAllRequest';
import SysPermisstionFindByIdRequest from './dto/sysPermisstionFindByIdRequest';
import SysPermissionUpdateRequest from './dto/sysPermisstionUpdateRequest';
import Sys_Permission from '@models/system/sys_permission';
import AbstractController from '@common/abstract/AbstractController';

type T = Sys_Permission | Sys_Permission[] | number | null
export default class SysPermisstionController extends AbstractController<T>{

    // create menu
    async create(req:Request, res: Response) {
        await super.execute(res, async () => {
            const reqSysPermission = new SysPremissionRegistRequest(req,res);
            if(reqSysPermission.sysPermissionRegist_Error !== "")
               return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE,reqSysPermission.sysPermissionRegist_Error);
            const regist = await SysPermissionRepo.save(reqSysPermission.permisstion);
            return Result.success(regist);
        })
    }

    // findall menu 
    async findAll(req:Request, res: Response)  {
        await super.execute(res, async () => {
            const reqSysPermissionFindAll = new SysPermisstionFindAllRequest(req,res);
            const lang = reqSysPermissionFindAll.lang;
            const result = await SysPermissionRepo.retrieveAll(lang);
            return Result.success(result);
        })
    }

    // findById menu
    async findById(req:Request, res: Response)  {
        await super.execute(res, async () => {
            const  reqPermisstionId = new SysPermisstionFindByIdRequest(req,res);
            if(reqPermisstionId.permisstionId_Error !== "") 
               return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqPermisstionId.permisstionId_Error);
            const permisstion = await SysPermissionRepo.retrieveById(reqPermisstionId.permisstionIdDto.id,reqPermisstionId.lang);
            return  Result.success(permisstion)
        })
    }

    // upate menu
    async update(req:Request, res: Response) {
        await super.execute(res, async () => {
            const reqPermisstionUpdate = new SysPermissionUpdateRequest(req,res);
            if(reqPermisstionUpdate.syspermisstionUpdate_Error !== "")
               return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE,reqPermisstionUpdate.syspermisstionUpdate_Error);
            const updatePermisstion = await SysPermissionRepo.update(reqPermisstionUpdate.SysPermisstion, reqPermisstionUpdate.lang);
            return Result.success(updatePermisstion);
        })
    }

    // delete menu
    async delete(req:Request, res: Response){
        await super.execute(res, async () => {
            const reqPermisstionId = new SysPermisstionFindByIdRequest(req,res);
            if(reqPermisstionId.permisstionId_Error !== "") 
               return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqPermisstionId.permisstionId_Error);
               const deletePermisstion = await SysPermissionRepo.delete(reqPermisstionId.permisstionIdDto.id, reqPermisstionId.lang);
               return Result.success(deletePermisstion);
        })
    }

    async deleteAll(req:Request, res: Response){

    }

    async findFatherId(req: Request, res:Response) {
        
    }
}