import { Router } from "express";
import SysDatascController from "./sysdatasc.controller";
import * as Const from "@common/const";
import { checkJwt } from "@middlewares/checkJwt";

class SysDatascRoutes {
    router = Router()

    sysDatascController = new SysDatascController();
    constructor() {

        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post(Const.SysDataScAddList,[checkJwt], this.sysDatascController.create);
        this.router.post(Const.SysDataScFindAll,[checkJwt], this.sysDatascController.findAll);
        this.router.post(Const.SysDataScFindById,[checkJwt], this.sysDatascController.findById);
        this.router.post(Const.SysDataScUpdate,[checkJwt], this.sysDatascController.update);
        this.router.post(Const.SysDataScDelete,[checkJwt], this.sysDatascController.delete);
    }
}

export default new SysDatascRoutes().router;