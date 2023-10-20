import { Router } from "express";
import * as Const from '@common/const'
import SysUserController from "./sysuser.controller";
import { checkJwt } from "@middlewares/checkJwt";

class SysUserRoutes {
    router = Router();

    sysUserController = new SysUserController()

    constructor() {
        this.intializeRoutes()
    }

    intializeRoutes() {
        this.router.post(Const.SysUserCreate,[checkJwt], this.sysUserController.create);
        this.router.post(Const.SysUserUpdate,[checkJwt], this.sysUserController.update);
        this.router.post(Const.SysUserFindAll,[checkJwt], this.sysUserController.findAll);
        this.router.post(Const.SysUserFindById,[checkJwt], this.sysUserController.findById);
        this.router.post(Const.SysUserPermission, [checkJwt], this.sysUserController.userPermission);
        this.router.post(Const.SysUserChangePassword,[checkJwt], this.sysUserController.changePassword);
        this.router.post(Const.SysUserLockAccout,[checkJwt], this.sysUserController.lockAccount);
    }
}

export default new SysUserRoutes().router;