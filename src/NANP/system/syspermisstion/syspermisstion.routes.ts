import { Router } from "express";
import SysPermisstionController from "./syspermisstion.controller";

import * as Const from '@common/const';
import { checkJwt } from "@middlewares/checkJwt";
class SysPermissionRoutes {
    router = Router();
    sysPermisstionController = new SysPermisstionController();
    constructor(){
        this.intializeRoutes();

    }

    intializeRoutes() {
        this.router.post(Const.SysPremissionCreate,[checkJwt], this.sysPermisstionController.create);
        this.router.post(Const.SysPremissionDelete,[checkJwt], this.sysPermisstionController.delete);
        this.router.post(Const.SysPremissionFindFather, this.sysPermisstionController.create);
        this.router.post(Const.SysPremissionListMenu,[checkJwt], this.sysPermisstionController.findAll);
        this.router.post(Const.SysPremissionPostDetailMenu,[checkJwt], this.sysPermisstionController.findById);
        this.router.post(Const.SysPremissionUpdate,[checkJwt], this.sysPermisstionController.update);
    }
}

export default new SysPermissionRoutes().router;