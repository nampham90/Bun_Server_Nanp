import Logger from "@common/log/logtofile";
import { PageInfo } from "@common/pageHelper/PageInfo";
import Sys_Department from "@models/system/sys_department";
import Sys_Role from "@models/system/sys_role.model";
import Sys_User from "@models/system/sys_user.model";

interface SearchCondition {
    department_id?: number;
}

interface ISysUserRepo {
    save(department_id: number,user: Sys_User, roleIds: number[]) : Promise<Sys_User | null> ;
    addUserRoles(userId: number, roleIds: number[]): Promise<void> ;
    retrieveAll(searchParams: SearchCondition, pageSize: number, pageNum: number): Promise<PageInfo<Sys_User>>;
    retrieveById(userId: number): Promise<Sys_User | null>;
    update(user: Sys_User): Promise<number>;
    changePassword(newpass:string) : Promise<number>;
    lockAccount(): Promise<number>;
}

class SysUserRepo implements ISysUserRepo {
    private logger: Logger;
    
    constructor() {
        this.logger = new Logger();
    }

    // đăng ký tài khoản
    async save(department_id: number,user: Sys_User,roleids: number[]): Promise<Sys_User | null> {

        try {
            const u = await Sys_User.create({
                user_name: user.user_name,
                password: await Bun.password.hash(user.password!),
                is_available: user.is_available,
                sex: user.sex,
                mobile: user.mobile,
                email: user.email,
                last_login_time: user.last_login_time,
                department_id: department_id
            });
            if(u){
                await this.addUserRoles(u.id!, roleids);
            }

            return await Sys_User.findByPk(u.id, {
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
                attributes: {exclude: ['password']}
     
            })

        } catch (error) {
            this.logger.logError(error);
            throw new Error("Method not implemented.");
        }
    }

    // add role user
    async addUserRoles(userId: number, roleIds: number[]): Promise<void> {
        let listRole: Sys_Role[] = [];
        try {
           roleIds.forEach( async (id)=> {
              const role = await Sys_Role.findByPk(id);
              if(role){listRole.push(role)}
           });
           const user = await Sys_User.findByPk(userId);
           if(user && listRole.length > 0) {
               await user.$add('sys_roles', listRole);
           }
        } catch (error) {
            this.logger.logError(error);
            throw new Error("Method not implemented.");
        }
    }

    // search all user
    async retrieveAll(searchParams: SearchCondition, pageSize: number , pageNum: number): Promise<PageInfo<Sys_User>> {
        try {
            let n = 0; 
            if(pageNum > 0) {
                 n = pageNum - 1;
            }
            let condition :any = {};
            if(searchParams.department_id) {
                condition.department_id = searchParams.department_id;
            }
            const {rows, count} =  await Sys_User.findAndCountAll({where: condition,limit: pageSize, offset: pageSize*n, attributes: {exclude: ['password']}});
            const pageInfo = new PageInfo(count, rows, pageNum, pageSize);
            return pageInfo;
        } catch (error) {
           this.logger.logError(error);
           throw new Error("Method not implemented.");
        }
        
    }

    // tìm kiêm user theo id
    async retrieveById(userId: number): Promise<Sys_User | null> {
        try {
            return await Sys_User.findByPk(userId, {include: ['sys_departments']});
        } catch (error) {
            this.logger.logError(error);
            throw new Error("Method not implemented.");
        }
       
    }

    // update user
    async update(user: Sys_User): Promise<number> {
        throw new Error("Method not implemented.");
    }

    // thay đổi password
    async changePassword(newpass: string): Promise<number> {
        throw new Error("Method not implemented.");
    }

    // khóa tài khoản. chuyển last time out = null
    async lockAccount(): Promise<number> {
        throw new Error("Method not implemented.");
    }

}

export default new SysUserRepo();