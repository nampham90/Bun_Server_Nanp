import AbstractRepository from "@common/abstract/AbstractRepository";
import Logger from "@common/log/logtofile";
import { PageInfo } from "@common/pageHelper/PageInfo";
import Sys_Department from "@models/system/sys_department";
import Sys_Role from "@models/system/sys_role.model";
import Sys_User from "@models/system/sys_user.model";

interface SearchCondition {
    department_id?: number;
}

interface ISysUserRepo<T> {
    save(department_id: number,user: Sys_User, roleIds: number[]) : Promise<T> ;
   // addUserRoles(userId: number, roleIds: number[]): Promise<T> ;
    retrieveAll(searchParams: SearchCondition, pageSize: number, pageNum: number): Promise<T>;
    retrieveById(userId: number): Promise<T>;
    update(user: Sys_User): Promise<T>;
    changePassword(userId: number,newpass:string, oldpass: string) : Promise<T>;
    lockAccount(): Promise<T>;
}
type T = Sys_User | PageInfo<Sys_User> | null | number | boolean | void
class SysUserRepo extends AbstractRepository<T> implements ISysUserRepo<T> {
    // đăng ký tài khoản
    async save(department_id: number,user: Sys_User,roleids: number[]): Promise<T> {
        return await super.execute(async () => {
            const u = await Sys_User.create({
                user_name: user.user_name,
                password: await Bun.password.hash(user.password!,{algorithm: "bcrypt", cost: 4}),
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
        })
    }

    // add role user
    async addUserRoles(userId: number, roleIds: number[]): Promise<T> {
        return await super.execute(async () => {
            let listRole: Sys_Role[] = [];
            roleIds.forEach( async (id)=> {
                const role = await Sys_Role.findByPk(id);
                if(role){listRole.push(role)}
            });
            const user = await Sys_User.findByPk(userId);
            if(user && listRole.length > 0) {
                await user.$add('sys_roles', listRole);
            }
        })
    }

    // search all user
    async retrieveAll(searchParams: SearchCondition, pageSize: number , pageNum: number): Promise<T> {
        return await super.execute(async () => {
            let condition :any = {};
            if(searchParams.department_id) {
                condition.department_id = searchParams.department_id;
            }
            const {rows, count} =  await Sys_User.findAndCountAll({where: condition,limit: pageSize, offset: pageSize*( pageNum - 1), attributes: {exclude: ['password']}});
            const pageInfo = new PageInfo(count, rows, pageNum, pageSize);
            return pageInfo;
        })
    }

    // tìm kiêm user theo id
    async retrieveById(userId: number): Promise<T> {
        return await super.execute(async () => {
            return await Sys_User.findByPk(userId, {include: ['sys_departments']});
        })
    }

    // update user
    async update(user: Sys_User): Promise<T> {
        // return await super.execute(async () => {
        //     const {user_name, sex, is_available, mobile, roles} = user;
        // })
        return null;
    }

    // thay đổi password
    async changePassword(userId: number, newpass: string, oldpass: string): Promise<T> {
        return await super.execute(async () => {
            const user = await Sys_User.findOne({where: {id: userId}});
            if(user) {
                const checkpassold = await this.checkPasssOld(user, oldpass);
                if(checkpassold) {
                    // update new pass
                    await Sys_User.update({password:newpass}, {where: {id: user.id}});
                    return 0;
                }
                return 99;
            }
            return 99;
        })
    }

    // kiem tra pass cu co hơp le không
    private async checkPasssOld(user: Sys_User, passOld: string): Promise<T> {
        return await super.execute(async () => {
            return  await Bun.password.verify(passOld, user.password!);
        })
    }

    // khóa tài khoản. chuyển last time out = null
    async lockAccount(): Promise<number> {
        throw new Error("Method not implemented.");
    }

}

export default new SysUserRepo();