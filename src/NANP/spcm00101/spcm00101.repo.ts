import Logger from "@common/log/logtofile";
import Sys_Department from "@models/system/sys_department";
import Sys_Role from "@models/system/sys_role.model";
import Sys_User from "@models/system/sys_user.model";
import db from '@db/index';
import { QueryTypes } from 'sequelize'
import AbstractRepository from "@common/abstract/AbstractRepository";

interface Code {
  code :string
}


interface ISpcm00101Repo<T> {
  login(condition: {email:string, password:string}): Promise<T>;
}
type T = Sys_User | number | null | boolean | string;
class Spcm00101LoginRepo extends AbstractRepository<T> implements ISpcm00101Repo<T> {

  async login(condition: { email: string; password: string; }): Promise<T> {
    return  await super.execute(async ()=> {
      const user = await this.checkEmail(condition.email);
      if(user instanceof Sys_User) {
      // check auth
        if(!user.last_login_time) {
          return 3; // Tài khoản của bạn chưa đươc xác thực
        }
      // check pass
        const checkPassword = await this.checkPassword(user,condition.password);
        if(checkPassword) return user; // đang nhập thanh công
        return 2; // password không đúng 
      } 
      return 1; // email chưa đang ký
    })
  }

  private async checkEmail(email: string) : Promise<T> {
    return super.execute( async () => {
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
    })
  }

  private async checkPassword(user: Sys_User, password:string): Promise<T> {
    return super.execute(async () => {
         return  await Bun.password.verify(password, user.password!);
    })
  }

  async roleOfPermisstion(iduser: number): Promise<T> {
    return super.execute( async () => {
      const strSql = " SELECT DISTINCT p.code FROM user_role ur " +
                    " JOIN role_permission rp ON ur.role_id = rp.role_id  " + 
                    " JOIN sys_permissions p ON rp.permission_id = p.id  " +
                    " WHERE ur.user_id = ?; "
      const data =  await this.sequelize.query(strSql, {
        replacements: [iduser],
        type: QueryTypes.SELECT
      });
      let strCode = ""
      const listcode = data as Code[];
      if(listcode.length > 0) {
        let i = 0;
        listcode.forEach(data => {
          strCode = listcode.map(data => (data as Code).code).join(",");
        })
      }
      return strCode;
    })
  }
}

export default new Spcm00101LoginRepo();


