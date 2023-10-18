import { Router } from "express";
import Spmt00900Controller from "./spmt00900.controller";
import * as Const from '@common/const'
import { checkJwt } from "@middlewares/checkJwt";

class Spmt00900Routes {
    router = Router();

    spmt00900Controller = new Spmt00900Controller()
    constructor() {
        this.intializeRoutes();
    }

    private intializeRoutes() {
        this.router.post(Const.Spmt00900FindByItemcd, [checkJwt], this.spmt00900Controller.findByItemcd);

    }
}

export default new Spmt00900Routes().router;