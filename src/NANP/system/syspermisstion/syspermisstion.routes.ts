import { Router } from "express";
import SysPermisstionController from "./syspermisstion.controller";

import * as Const from '@common/const';
class SysPermissionRoutes {
    router = Router();
    sysPermisstionController = new SysPermisstionController();
    constructor(){
        this.intializeRoutes();

    }

    intializeRoutes() {
        this.router.post(Const.SysPremissionCreate, this.sysPermisstionController.create);
        this.router.post(Const.SysPremissionDelete, this.sysPermisstionController.delete);
        this.router.post(Const.SysPremissionFindFather, this.sysPermisstionController.create);
        this.router.post(Const.SysPremissionListMenu, this.sysPermisstionController.create);
        this.router.post(Const.SysPremissionPostDetailMenu, this.sysPermisstionController.create);
        this.router.post(Const.SysPremissionUpdate, this.sysPermisstionController.update);
    }
}

export default new SysPermissionRoutes().router;