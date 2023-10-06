import { Router } from "express";
import SysDepartmentController from "./sysdepartment.controller";
import * as Const from '@common/const';

class SysDepartmentRoutes {
    router = Router();

    sysDepartmentController = new SysDepartmentController();

    constructor() {
        this.intializeRoutes();

    }

    intializeRoutes() {
        this.router.post("/ant100addPhongban", this.sysDepartmentController.create);
    }
}

export default new SysDepartmentRoutes().router;