
import { ErrorEnum } from '@common/enums/ErrorCodeEnum'
import { Result } from '@common/result/Result'
import {NextFunction, Request, Response} from 'express'
import SysRoleRegistRequest from './dto/sysroleRegistRequest';
import sysroleRepo from './sysrole.repo';
import SysRoloFindAllRequest from './dto/sysroleFindAllRequest';
import SysRoleFindByIdRequest from './dto/sysroleFindByIdRequest';
import SysRoleUpdateRequest from './dto/sysroleUpdateRequest';
import SysRoleUpdatePermissionRoleRequest from './dto/sysroleUpdatePermissionRoleRequest';
import AbstractController from '@common/abstract/AbstractController';
import Sys_Role from '@models/system/sys_role.model';
type T = number | Sys_Role | null | Sys_Role[] | string[];
export default class SysRoleController extends AbstractController<T>{
    
    async create(req: Request, res:Response)  {
        await super.execute(res, async () => {
            const reqRoleRegist = new SysRoleRegistRequest(req,res);
            if(reqRoleRegist.sysRoleRegist_Error !== "") {
                return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqRoleRegist.sysRoleRegist_Error);
            }
            const role = await sysroleRepo.save(reqRoleRegist.role,reqRoleRegist.lang);
            return Result.success(role);
        })
    }

    async findAll(req: Request, res:Response)  {
        await super.execute(res, async () => {
            const reqSysRoleFindAll = new SysRoloFindAllRequest(req,res);
            const lstRole = await sysroleRepo.retrieveAll(reqSysRoleFindAll.lang);
            return Result.success(lstRole);
        })
    }

    async findById(req: Request, res:Response){
        await super.execute(res, async () => {
            const reqSysRoleFindById = new SysRoleFindByIdRequest(req,res);
            if(reqSysRoleFindById.sysRoleFindById_Error !== "") {
                return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqSysRoleFindById.sysRoleFindById_Error);
            }
            const role = await sysroleRepo.retrieveById(reqSysRoleFindById.roleId, reqSysRoleFindById.lang);
            return Result.success(role);
        })
    }

    async update(req: Request, res:Response) {
        await super.execute(res, async () => {
            const reqSysRoleUpdate = new SysRoleUpdateRequest(req,res);
            if(reqSysRoleUpdate.sysRoleUpdate_Error !== "") {
                return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqSysRoleUpdate.sysRoleUpdate_Error);
            }
            const update = await sysroleRepo.update(reqSysRoleUpdate.role, reqSysRoleUpdate.lang);
            if(update === 0) return Result.failureCode(ErrorEnum.SYS_ROLE_ERR_NONE);
            return Result.success();
        })
    }

    async delete(req: Request, res:Response) {
        await super.execute(res, async () => {
            const reqSysRoleFindById = new SysRoleFindByIdRequest(req,res);
            if(reqSysRoleFindById.sysRoleFindById_Error !== "") {
                return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE,reqSysRoleFindById.sysRoleFindById_Error);
            }
            const deleteRole = await sysroleRepo.delete(reqSysRoleFindById.roleId, reqSysRoleFindById.lang);
            if(deleteRole === 0) return Result.failureCode(ErrorEnum.SYS_ROLE_ERR_NONE);
            return Result.success();
        })
    }

    async updateRolePermissions(req: Request, res:Response)  {
        await super.execute(res, async ()=> {
            const reqSysRoleUpdatePermissions = new SysRoleUpdatePermissionRoleRequest(req,res);
            if (reqSysRoleUpdatePermissions.sysroleUpdatePermissionRole_Error !== "") {
                return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE,reqSysRoleUpdatePermissions.sysroleUpdatePermissionRole_Error);
            }
            const result = await sysroleRepo.updateRolePermissions(reqSysRoleUpdatePermissions.reqDto.roleId, reqSysRoleUpdatePermissions.reqDto.permissionIds);
            return Result.success(result);
        })
    }

    async getPermissionRole(req: Request, res:Response) {
        await super.execute(res, async ()=> {
            const reqSysRoleFindById = new SysRoleFindByIdRequest(req,res);
            if(reqSysRoleFindById.sysRoleFindById_Error !== "") {
                return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE,reqSysRoleFindById.sysRoleFindById_Error);
            }
            const role = await sysroleRepo.getPermissionRole(reqSysRoleFindById.roleId, reqSysRoleFindById.lang);
            return Result.success(role);
        })
    }
}