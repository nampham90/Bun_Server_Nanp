import AbstractController from "@common/abstract/AbstractController";
import Tmt090Product from "@models/master/tmt090_product.model";
import {Request, Response} from 'express';
import spmt00900Repo from "./spmt00900.repo";
import { Result } from "@common/result/Result";
import Spmt00900FindByItemcdRequest from "./dto/spmt00900FindByItemcdRequest";
import { ErrorEnum } from "@common/enums/ErrorCodeEnum";

type T = Tmt090Product | Tmt090Product[]
export default class Spmt00900Controller extends AbstractController<T> {

    async findByItemcd(req: Request, res: Response) {
        await super.execute(res, async () => {
            const reqSpmt00900FindByItemcd = new Spmt00900FindByItemcdRequest(req,res);
            if(reqSpmt00900FindByItemcd.spmt00900FindByItemcd_Error !== "") 
               return Result.failureCodeRelease(ErrorEnum.SYS_ERR_VALIDATE, reqSpmt00900FindByItemcd.spmt00900FindByItemcd_Error);
            const products = await spmt00900Repo.retrieveById(reqSpmt00900FindByItemcd.itemcd, reqSpmt00900FindByItemcd.lang);
            if(products instanceof Tmt090Product) {
                return Result.success(products);
            }
            return Result.failureCode(ErrorEnum.SPMT009900_ERR_NO_PRODUCT);
           
        })
    }
}
