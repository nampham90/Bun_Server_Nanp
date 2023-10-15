import { Router } from "express";
import * as Const from '@common/const'
import SysRoleController from "./sysrole.controller";
import { checkJwt } from "@middlewares/checkJwt";

class SysRoleRoutes {
    router = Router();
    sysroleController = new SysRoleController()
    constructor() {
        this.intializeRoutes();
    }

    private intializeRoutes() {
        this.router.post(Const.SysRoleCreate,[checkJwt], this.sysroleController.create);
        this.router.post(Const.SysRoleFindAll,[checkJwt], this.sysroleController.findAll);
        this.router.post(Const.SysRoleFindById,[checkJwt], this.sysroleController.findById);
        this.router.post(Const.SysRoleUpdate,[checkJwt], this.sysroleController.update);
        this.router.post(Const.SysRoleDelete,[checkJwt], this.sysroleController.delete);
        this.router.post(Const.SysRoleGetPermission,[checkJwt], this.sysroleController.getPermissionRole);
        this.router.post(Const.SysRolePutPermission,[checkJwt], this.sysroleController.updateRolePermissions);

    }
}

export default new SysRoleRoutes().router;