
import Sys_Department from '@models/system/sys_department';
import {Request, Response} from 'express';
import sysdepartmentRepo from './sysdepartment.repo';
import { Result } from '@common/result/Result';
import { ErrorEnum } from '@common/enums/ErrorCodeEnum';;
import SysDepartmentFindAllRequest from '@nanp/system/sysdepartment/dto/sysdepartmentFindAllRequest';
import SysDepartmentRegistRequest from './dto/sysdepartmentRegistRequest';
import { PageInfo } from '@common/pageHelper/PageInfo';
import AbstractController from '@common/abstract/AbstractController';
import SysDepartmentFindByIdRequest from './dto/sysdepartmentFindByIdRequest';
import SysDepartmentUpdateRequest from './dto/sysdepartmentUpdateRequest';
type T = Sys_Department | null | PageInfo<Sys_Department> | number
export default class SysDepartmentController extends AbstractController<T>{
     
    async create(req: Request, res: Response) {
        await super.execute(res, async () => {
            const reqDepartmetRegist = new SysDepartmentRegistRequest(req,res);
            if(reqDepartmetRegist.department_Error !== "")
                return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE,reqDepartmetRegist.department_Error);
            const saveDepartment = await sysdepartmentRepo.save(reqDepartmetRegist.department);
            return Result.success(saveDepartment)
        })
    }

    async findAll(req: Request, res: Response) {
        await super.execute(res, async () => {
            const reqSysdepartmentFindAll = new SysDepartmentFindAllRequest(req,res);
            const department_name = reqSysdepartmentFindAll.department_name;
            const pageSize:number = reqSysdepartmentFindAll.pageSize;
            const pageNum:number = reqSysdepartmentFindAll.pageNum;
            const departments = await sysdepartmentRepo.retrieveAll({department_name,pageSize,pageNum});
            return  Result.success(departments);
        })
    }

    async findById(req: Request, res: Response) {
        await super.execute(res, async () => {
            const reqDepmentFindById = new SysDepartmentFindByIdRequest(req,res)
            if(reqDepmentFindById.sysdepmentFindById_Error !=="") {
                return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqDepmentFindById.sysdepmentFindById_Error);
            }
            const department = await sysdepartmentRepo.retrieveById(reqDepmentFindById.departmentId);
            if(department instanceof Sys_Department) return Result.success(department)
            return Result.failureCode(ErrorEnum.SYS_DEPARTMENT_ERR_NOID)
        })
    }

    async update(req: Request, res:Response)  {
        await super.execute(res,async () => {
            const reqDepartmentUpdate = new SysDepartmentUpdateRequest(req,res);
            if(reqDepartmentUpdate.sysdepartmentUpdate_Error !== "") 
               return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqDepartmentUpdate.sysdepartmentUpdate_Error);
            const update = await sysdepartmentRepo.update(reqDepartmentUpdate.sysDepartment);
            return Result.success(update);
        })
    }

    async delete(req: Request, res: Response) {
        await super.execute(res, async () => {
            const reqDepartmentDelete = new SysDepartmentFindByIdRequest(req,res);
            if(reqDepartmentDelete.sysdepmentFindById_Error !== "") 
               return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqDepartmentDelete.sysdepmentFindById_Error);
            const deleteOne = await sysdepartmentRepo.delete(reqDepartmentDelete.departmentId);
            return Result.success();
        })
    }

    async deleteAll(req:Request, res:Response) {
        await super.execute(res, async () => {
            const deleteAll = await sysdepartmentRepo.deleteAll();
            return Result.success();
        })
    }
}