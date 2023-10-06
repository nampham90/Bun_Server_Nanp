
import Sys_Department from '@models/system/sys_department';
import {Request, Response} from 'express';
import sysdepartmentRepo from './sysdepartment.repo';
import { Result } from '@common/result/Result';
import { ErrorEnum } from '@common/enums/ErrorCodeEnum';
export default class SysDepartmentController {

    async create(req: Request, res: Response) {
        try {
            console.log(req.body);
            const department: Sys_Department = req.body;
            const saveDepartment = await sysdepartmentRepo.save(department);
            res.status(200).send(Result.success(saveDepartment));
        } catch (error) {
            res.status(200).send(Result.failureCode(ErrorEnum.SYS_ERR_GLOBAL));
        }
    }
}