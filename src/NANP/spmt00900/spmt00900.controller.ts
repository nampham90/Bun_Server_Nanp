import AbstractController from "@common/abstract/AbstractController";
import Tmt090Product from "@models/master/tmt090_product.model";
import {Request, Response} from 'express';
import spmt00900Repo from "./spmt00900.repo";
import { Result } from "@common/result/Result";

type T = Tmt090Product | Tmt090Product[]
export default class Spmt00900Controller extends AbstractController<T> {

    async findByItemcd(req: Request, res: Response) {
        await super.execute(res, async () => {
            const products = await spmt00900Repo.retrieveById("123123", "jpn");
            return Result.success(products);
        })
    }
}
