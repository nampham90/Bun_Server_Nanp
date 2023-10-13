import Logger from "@common/log/logtofile";
import Sys_Department from "@models/system/sys_department";
import Sys_Role from "@models/system/sys_role.model";
import Sys_User from "@models/system/sys_user.model";
import db from '@db/index';
import { QueryTypes } from 'sequelize'

interface Code {
  code :string
}


interface ISpcm00101Repo {
  login(condition: {email:string, password:string}): Promise<Sys_User | number>;
}

class Spcm00101LoginRepo implements ISpcm00101Repo {
  private logger: Logger;

  constructor() {
  this.logger = new Logger();
  }

  async login(condition: { email: string; password: string; }): Promise<Sys_User | number> {
    try {
      const user = await this.checkEmail(condition.email);
      if(user) {
        // check pass
         const checkPassword = await this.checkPassword(user,condition.password);
         if(checkPassword) return user; // đang nhập thanh công
         return 2; // password không đúng 
      } else {
         return 1; // email chưa đang ký
      }
    } catch (error) {
      this.logger.logError(error);
      throw new Error("Error truy vấn hệ thống");
    }
  }

  private async checkEmail(email: string) : Promise<Sys_User |  null> {
    try {
      return await Sys_User.findOne({where: {email: email},
        include: [
          {
              model: Sys_Role,
              as: 'sys_roles',
              through: {
                  attributes: []
              }
          },
          {
              model: Sys_Department,
              as: 'sys_departments'
          }
      ],
      });
    } catch (error) {
      this.logger.logError(error);
      throw new Error("Mysql Error !")
    }
  }

  private async checkPassword(user: Sys_User, password:string): Promise<boolean> {
    try {
      return  await Bun.password.verify(password, user.password!);
    } catch (error) {
      this.logger.logError(error);
      throw new Error("loi gi day");
    }
  }

  async roleOfPermisstion(iduser: number): Promise<string> {
    try {
      const con = new db();
      const strSql = " SELECT DISTINCT p.code FROM user_role ur " +
                    " JOIN role_premisstion rp ON ur.role_id = rp.role_id  " + 
                    " JOIN sys_permissions p ON rp.permission_id = p.id  " +
                    " WHERE ur.user_id = ?; "
      const data =  await con.sequelize?.query(strSql, {
        replacements: [iduser],
        type: QueryTypes.SELECT
      });
      let strCode = ""
      if(data) {
        let i = 0;
        data.forEach(data => {
          const code:Code = data as Code;
          let dauphay = "";
          if(i > 0) {
             dauphay = ","
          }
          strCode = strCode + dauphay + code.code ;
          i++
        })
      }
      return strCode;
    } catch (error) {
      this.logger.logError(error);
      throw new Error("loi gi day");
    }
  }
}

export default new Spcm00101LoginRepo();


