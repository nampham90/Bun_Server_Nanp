import { Router } from "express";
import SysDepartmentController from "./sysdepartment.controller";
import * as Const from '@common/const';
import { checkJwt } from "@middlewares/checkJwt";

class SysDepartmentRoutes {
    router = Router();

    sysDepartmentController = new SysDepartmentController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post(Const.SysDepartmentCreate, [checkJwt], this.sysDepartmentController.create);
        this.router.post(Const.SysDepartmentFindAll, [checkJwt], this.sysDepartmentController.findAll);
        this.router.post(Const.SysDepartmentFindById, [checkJwt], this.sysDepartmentController.findById);
        this.router.post(Const.SysDepartmentUpdate, [checkJwt], this.sysDepartmentController.update);
        this.router.post(Const.SysDepartmentDelete, [checkJwt], this.sysDepartmentController.delete);
    }
}
export default new SysDepartmentRoutes().router;