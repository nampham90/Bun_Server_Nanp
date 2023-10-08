
import Sys_Department from '@models/system/sys_department';
import {Request, Response} from 'express';
import sysdepartmentRepo from './sysdepartment.repo';
import { Result } from '@common/result/Result';
import { ErrorEnum } from '@common/enums/ErrorCodeEnum';;
import SysDepartmentFindAllRequest from '@nanp/system/sysdepartment/dto/sysdepartmentFindAllRequest';
import SysDepartmentRegistRequest from './dto/sysdepartmentRegistRequest';
export default class SysDepartmentController{

    async create(req: Request, res: Response): Promise<Response> {
        const reqDepartmetRegist = new SysDepartmentRegistRequest(req,res);
        try {
            if(reqDepartmetRegist.department_Error !== "") {
                return res.status(200).send(Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE,reqDepartmetRegist.department_Error));
            }
            const saveDepartment = await sysdepartmentRepo.save(reqDepartmetRegist.department);
            return res.status(200).send(Result.success(saveDepartment));
        } catch (error) {
            return res.status(200).send(Result.failureCode(ErrorEnum.SYS_ERR_GLOBAL));
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        const reqSysdepartmentFindAll = new SysDepartmentFindAllRequest(req,res);
        const department_name = reqSysdepartmentFindAll.department_name;
        const pageSize:number = reqSysdepartmentFindAll.pageSize;
        const pageNum:number = reqSysdepartmentFindAll.pageNum;
        try {
            const departments = await sysdepartmentRepo.retrieveAll({department_name,pageSize,pageNum});
            res.status(200).send(Result.success(departments));
        } catch (error) {
            res.status(200).send(Result.failureCode(ErrorEnum.SYS_ERR_GLOBAL));
        }
    }
}