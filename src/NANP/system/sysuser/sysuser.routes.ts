import { Router } from "express";
import * as Const from '@common/const'
import SysUserController from "./sysuser.controller";

class SysUserRoutes {
    router = Router();

    sysUserController = new SysUserController()

    constructor() {
        this.intializeRoutes()
    }

    intializeRoutes() {
        this.router.post(Const.SysUserCreate, this.sysUserController.create);
        this.router.post(Const.SysUserUpdate, this.sysUserController.update);
        this.router.post(Const.SysUserFindAll, this.sysUserController.findAll);
        this.router.post(Const.SysUserFindById, this.sysUserController.findById);
        this.router.post(Const.SysUserChangePassword, this.sysUserController.changePassword);
        this.router.post(Const.SysUserLockAccout, this.sysUserController.lockAccount);
    }
}

export default new SysUserRoutes().router;