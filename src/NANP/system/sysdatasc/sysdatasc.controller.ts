
import sysdatascRepo from './sysdatasc.repo';
import {Request, Response} from 'express';
import AbstractController from '../../../common/abstract/AbstractController';
import Sys_Datasc from '@models/system/sys_datasc.model';
import SysDatascRegistListRequest from './dto/sysdatascRegistListRequest';
import { Result } from '@common/result/Result';
import { ErrorEnum } from '@common/enums/ErrorCodeEnum';
import { PageInfo } from '@common/pageHelper/PageInfo';
import SysDatascFindByIdPermissionRequest from './dto/sysdatascFindByIdPermissionRequest';

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
    async findById(req:Request, res:Response) {}
    async update(req:Request, res:Response) {}
    async delete(req:Request, res:Response) {}
}