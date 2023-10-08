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
        this.router.post(Const.SysDepartmentCreate, checkJwt, this.sysDepartmentController.create);
        this.router.post(Const.SysDepartmentFindAll, this.sysDepartmentController.findAll);
    }
}
export default new SysDepartmentRoutes().router;