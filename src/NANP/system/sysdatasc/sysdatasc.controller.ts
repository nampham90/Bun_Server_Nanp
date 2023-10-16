
import sysdatascRepo from './sysdatasc.repo';
import {Request, Response} from 'express';
import AbstractController from '../../../common/abstract/AbstractController';
import Sys_Datasc from '@models/system/sys_datasc.model';
import SysDatascRegistListRequest from './dto/sysdatascRegistListRequest';
import { Result } from '@common/result/Result';
import { ErrorEnum, ErrorCodeEnum } from '@common/enums/ErrorCodeEnum';
import { PageInfo } from '@common/pageHelper/PageInfo';
import SysDatascFindByIdPermissionRequest from './dto/sysdatascFindByIdPermissionRequest';
import SysDatascFindByIdRequest from './dto/sysdatascFindByIdRequest';
import SysDatascUpdateRequest from './dto/sysdatascUpdateRequest';

type T = Sys_Datasc[] | Sys_Datasc | null | number | PageInfo<Sys_Datasc>
export default class SysDatascController extends AbstractController<T> {
    async create(req:Request, res:Response) {
        await super.execute(res, async () => {
            const reqSysDatascRegist = new SysDatascRegistListRequest(req,res); 
            if(reqSysDatascRegist.sysDatascRegist_Error !== "") {
                return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqSysDatascRegist.sysDatascRegist_Error);
            }
            const result = await sysdatascRepo.save(reqSysDatascRegist.listdataInsert);
            return Result.success(result);
        })

    }
    async findAll(req:Request, res:Response) {
        await super.execute(res, async () => {
            const reqSysDatascFindByIdPermission = new SysDatascFindByIdPermissionRequest(req,res);
            if(reqSysDatascFindByIdPermission.sysDatascFindByIdPermission_Error !== "") 
                return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqSysDatascFindByIdPermission.sysDatascFindByIdPermission_Error);
            const pageInfo = await sysdatascRepo.retrieveAll(
                reqSysDatascFindByIdPermission.permissionId, 
                reqSysDatascFindByIdPermission.lang,
                reqSysDatascFindByIdPermission.pageNum, 
                reqSysDatascFindByIdPermission.pageSize);  
            return Result.success(pageInfo);
        })

    }
    async findById(req:Request, res:Response) {
        await super.execute(res, async () => {
            const reqsysdatascFindById = new SysDatascFindByIdRequest(req,res);
            if(reqsysdatascFindById.sysdatascFindById_Error !== "") 
                return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqsysdatascFindById.sysdatascFindById_Error);
            const datasc = await sysdatascRepo.retrieveById(reqsysdatascFindById.datascId, reqsysdatascFindById.lang);
            return Result.success(datasc);
        })
    }
    async update(req:Request, res:Response) {
        await super.execute(res, async () => {
            const reqSysDatscUpdate = new SysDatascUpdateRequest(req,res);

            if(reqSysDatscUpdate.sysDatascUpdate_Error !== "") 
               return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqSysDatscUpdate.sysDatascUpdate_Error);
            const checkId = await sysdatascRepo.retrieveById(reqSysDatscUpdate.sysDatasc.id!,reqSysDatscUpdate.lang);
            if(!checkId) {
                const errorEnum = new ErrorCodeEnum(ErrorEnum.SYS_DATASC_ERR_NOID);
                return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, errorEnum.getMsg());
            } 
            const upateOne = await sysdatascRepo.update(reqSysDatscUpdate.sysDatasc,reqSysDatscUpdate.lang);
            return Result.success(upateOne);
        })
    }
    async delete(req:Request, res:Response) {
        await super.execute(res, async () => {
            const reqSysDatascDelete = new SysDatascFindByIdRequest(req,res);
            if(reqSysDatascDelete.sysdatascFindById_Error !== "") 
               return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqSysDatascDelete.sysdatascFindById_Error);
            const checkId = await sysdatascRepo.retrieveById(reqSysDatascDelete.datascId,reqSysDatascDelete.lang);
            if(!checkId) {
                const errorEnum = new ErrorCodeEnum(ErrorEnum.SYS_DATASC_ERR_NOID);
                return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, errorEnum.getMsg());
            }
            const delteOne = await sysdatascRepo.delete(reqSysDatascDelete.datascId,reqSysDatascDelete.lang);
            return Result.success(delteOne);

        })

    }
}