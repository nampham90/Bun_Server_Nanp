import Sys_User from "@models/system/sys_user.model";
import { Op , Sequelize} from "sequelize";

interface ISpcm00101Repo {
   login(condition: {email:string, password:string}): Promise<Sys_User | null>;
}

class Spcm00101LoginRepo implements ISpcm00101Repo {

  async login(condition: { email: string; password: string; }): Promise<Sys_User | null> {
     try {
        const pass = (await Bun.password.hash(condition.password)).substring(0,31);
        return await Sys_User.findOne({
           where: {
              email: condition.email,
              password: { [Op.like] : pass + '%'}
           }
        });
     } catch (error) {
        throw new Error("Error truy vấn hệ thống");
     }
  }
}

export default new Spcm00101LoginRepo();


