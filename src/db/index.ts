import { Sequelize } from "sequelize-typescript";
import { config, dialect } from "@config/db.config";
import Tutorial from "../models/tutorial.model";
import Sys_User from "@models/system/sys_user.model";
import Sys_Role from "@models/system/sys_role.model";
import Sys_Department from "@models/system/sys_department";
import Sys_Permission from "@models/system/sys_permission";
import Sys_Datasc from '@models/system/sys_datasc.model';
import Sys_Datafile from "@models/system/sys_datafile.model";

class Database {
    public sequelize: Sequelize | undefined;

    constructor() {
        this.connectToDatabase();
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
            Tutorial,
            Sys_User,
            Sys_Role,
            Sys_Department,
            Sys_Permission,
            Sys_Datasc,
            Sys_Datafile
           ]
        });
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

        Sys_Role.belongsToMany(Sys_Permission,{
            through: "role_premisstion",
            as: "sys_permisstions",
            foreignKey: "role_id",
        })

        Sys_Permission.belongsToMany(Sys_Role, {
            through: "role_premisstion",
            as: "sys_roles",
            foreignKey: "permission_id",
        })

        Sys_Department.hasMany(Sys_User, {as : 'sys_users'})


        Sys_User.belongsTo(Sys_Department, {
            foreignKey: "department_id",
            as: "sys_departments",
        })

        // 1 menu co nhieu datasc
        Sys_Permission.hasMany(Sys_Datasc, {as: "sys_datascs"})
        Sys_Datasc.belongsTo(Sys_Permission, {
            foreignKey: "permission_id",
            as: "sys_permissions",
        })

        // 1 user co nhieu file
        Sys_User.hasMany(Sys_Datafile, {as: 'sys_datafiles'})
        Sys_Datafile.belongsTo(Sys_User, {
            foreignKey: "user_id",
            as: "sys_users",
        })
        //-----------------------------------------------------

        //this.sequelize?.drop();
        await this.sequelize
        .authenticate()
        .then(() => {
          console.log("Connection has been established successfully.");
        })
        .catch((err) => {
          console.error("Unable to connect to the Database:", err);
        });
    }
}

export default Database;