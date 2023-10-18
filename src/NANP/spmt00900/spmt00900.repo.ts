import AbstractRepository from "@common/abstract/AbstractRepository";
import Tmt090Product from "@models/master/tmt090_product.model";
import Tmt091ProdcutCategory from "@models/master/tmt091_productcategory.model";
import Tmt093ProdcutSize from "@models/master/tmt093_productsize.model";
import Tmt094ProdcutColor from "@models/master/tmt094_productcolor.model";
import Tmt092ProdcutVariation from "@models/master/tmt092_productvariation.model";
interface ISpmt00900Repo<T>  {

    retrieveById(itemcd: string, lang:string): Promise<T>;
}

type T = Tmt090Product | Tmt090Product[]
class Spmt00900Repo extends AbstractRepository<T> implements ISpmt00900Repo<T> {

    async retrieveById(itemcd: string, lang: string): Promise<T> {
        return await super.execute(async () => {
            const products = await Tmt090Product.findAll({where: {itemcd: '231018'}, 
            include: [
                {
                    model: Tmt092ProdcutVariation,
                    as: 'tmt092_productvariations',
                    include: [
                        { model: Tmt093ProdcutSize, as: 'tmt093_productsizes'},{model: Tmt094ProdcutColor, as: 'tmt094_productcolors'}]
                },
                {
                    model: Tmt091ProdcutCategory,
                    as: 'tmt091_productcategorys'
                }
            ]})
            return products 

        })
    }

}

export default new Spmt00900Repo();