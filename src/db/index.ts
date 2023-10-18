import { Sequelize } from "sequelize-typescript";
import { config, dialect } from "@config/db.config";
// system
import Sys_User from "@models/system/sys_user.model";
import Sys_Role from "@models/system/sys_role.model";
import Sys_Department from "@models/system/sys_department";
import Sys_Permission from "@models/system/sys_permission";
import Sys_Datasc from '@models/system/sys_datasc.model';
import Sys_Datafile from "@models/system/sys_datafile.model";
// master
import Tmt020VideoYoutubes from "@models/master/tmt020_videoyoutube.model"
import Logger from "@common/log/logtofile";
import Tmt060Msg from "@models/master/tmt060_msg.model";
import Tmt091ProdcutCategory from "@models/master/tmt091_productcategory.model";
import Tmt090Product from "@models/master/tmt090_product.model";
import Tmt094ProdcutColor from "@models/master/tmt094_productcolor.model";
import Tmt093ProdcutSize from "@models/master/tmt093_productsize.model";
import Tmt092ProdcutVariation from "@models/master/tmt092_productvariation.model";

class Database {
    public sequelize: Sequelize | undefined;
    private logger: Logger

    constructor() {
        this.connectToDatabase();
        this.logger = new Logger();
    }

    private async connectToDatabase() {

        this.sequelize = new Sequelize({
            database: config.DB,
            username: config.USER,
            password: config.PASSWORD,
            host: config.HOST,
            dialect: dialect,
            pool: {
              max: config.pool.max,
              min: config.pool.min,
              acquire: config.pool.acquire,
              idle: config.pool.idle
            },
           models: [
            Sys_User,
            Sys_Role,
            Sys_Department,
            Sys_Permission,
            Sys_Datasc,
            Sys_Datafile,

            // tmt
            Tmt060Msg,
            Tmt020VideoYoutubes,
            
            // master product
            Tmt090Product,
            Tmt091ProdcutCategory,
            Tmt092ProdcutVariation,
            Tmt093ProdcutSize,
            Tmt094ProdcutColor,
            // martes san phâm

           ],
           logging: (msg) => {
               this.logger.logError(msg);
           }
        });
        // quan hệ nhiều variation vơi color
        Tmt092ProdcutVariation.belongsToMany(Tmt093ProdcutSize, { through: 'VariationSize', as: 'tmt093_productsizes', foreignKey: 'variation_id' });
        Tmt093ProdcutSize.belongsToMany(Tmt092ProdcutVariation, { through: 'VariationSize',as: 'tmt092_productvariations', foreignKey: 'size_id' });

        // quan hệ nhiêu varialtion vơi size
        Tmt092ProdcutVariation.belongsToMany(Tmt094ProdcutColor, { through: 'VariationColor',as: 'tmt094_productcolors', foreignKey: 'variation_id' });
        Tmt094ProdcutColor.belongsToMany(Tmt092ProdcutVariation, { through: 'VariationColor', as: 'tmt092_productvariations', foreignKey: 'color_id' });

        // 1 sản phảm có nhiều bến thể
        Tmt090Product.hasMany(Tmt092ProdcutVariation, { as: 'tmt092_productvariations' });
        Tmt092ProdcutVariation.belongsTo(Tmt090Product, { foreignKey: 'product_id', as: "tmt091_productcategorys", targetKey: 'lang'});

        // 1 danh mục có nhiều sản phẩm
        Tmt091ProdcutCategory.hasMany(Tmt090Product, {as: 'tmt090_products'});
        Tmt090Product.belongsTo(Tmt091ProdcutCategory, {
            foreignKey: "category_id",
            as: "tmt091_productcategorys",
            targetKey: 'lang'
        })

        // quan he nhieu nhieu trong role user
        Sys_User.belongsToMany(Sys_Role, {
            through: "user_role",
            as: "sys_roles",
            foreignKey: "user_id",
        })

        Sys_Role.belongsToMany(Sys_User, {
            through: "user_role",
            as: "sys_users",
            foreignKey: "role_id",
        })

        // quan he nhieeu nhieu trong permiss role
        Sys_Role.belongsToMany(Sys_Permission,{
            through: "role_permission",
            as: "sys_permissions",
            foreignKey: "role_id",
        })

        Sys_Permission.belongsToMany(Sys_Role, {
            through: "role_permission",
            as: "sys_roles",
            foreignKey: "permission_id",
        })

        // quan hệ 1 nhiều. 1 phòng ban có nhiều user
        Sys_Department.hasMany(Sys_User, {as : 'sys_users'})
        Sys_User.belongsTo(Sys_Department, {
            foreignKey: "department_id",
            as: "sys_departments",
        })

        // 1 menu co nhieu. 1 menu có nhiều dư liệu màn hình
        Sys_Permission.hasMany(Sys_Datasc, {as: "sys_datascs"})
        Sys_Datasc.belongsTo(Sys_Permission, {
            foreignKey: "permission_id",
            as: "sys_permissions",
            targetKey: 'lang'
        })

        // 1 user co nhieu . 1 user thì sử dụng nhiều file ảnh
        Sys_User.hasMany(Sys_Datafile, {as: 'sys_datafiles'})
        Sys_Datafile.belongsTo(Sys_User, {
            foreignKey: "user_id",
            as: "sys_users",
        })
        //----------------------table tmt-------------------------------

        
        //await Tmt020VideoYoutubes.drop();
        //this.sequelize?.drop();
       // await Sys_Datasc.drop();
      // await Tmt091ProdcutSize.drop()
      // await Tmt091ProdcutColor.drop()
         
        await this.sequelize
        .authenticate()
        .then(() => {
          //console.log("Connection has been established successfully.");
        })
        .catch((err) => {
          console.error("Unable to connect to the Database:", err);
        });


        //console.log(products);
    }
}

export default Database;