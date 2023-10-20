import AbstractRepository from "@common/abstract/AbstractRepository";
import Logger from "@common/log/logtofile";
import { PageInfo } from "@common/pageHelper/PageInfo";
import Sys_Department from "@models/system/sys_department";
import Sys_Permission from "@models/system/sys_permission";
import Sys_Role from "@models/system/sys_role.model";
import Sys_User from "@models/system/sys_user.model";
import { QueryTypes } from 'sequelize'
interface SearchCondition {
    department_id?: number;
}

interface ISysUserRepo<T> {
    userPermission(userId: number, lang:string): Promise<T>;
    save(department_id: number,user: Sys_User, roleIds: number[]) : Promise<T> ;
   // addUserRoles(userId: number, roleIds: number[]): Promise<T> ;
    retrieveAll(searchParams: SearchCondition, pageSize: number, pageNum: number): Promise<T>;
    retrieveById(userId: number): Promise<T>;
    update(user: Sys_User): Promise<T>;
    changePassword(userId: number,newpass:string, oldpass: string) : Promise<T>;
    lockAccount(userId: number): Promise<T>;
}
type T = Sys_User | PageInfo<Sys_User> | null | number | boolean | void | Sys_Permission[]
class SysUserRepo extends AbstractRepository<T> implements ISysUserRepo<T> {

    // "filters": {
    // }
    async userPermission(userId: number, lang: string): Promise<T> {
        return await super.execute( async () => {
            // sql
            const strSql = " SELECT  p.id,p.lang,p.menu_name,p.code,p.father_id,p.order_num,p.path,p.menu_type,p.visible,p.status,p.is_new_link,p.al_icon,p.icon,p.createdAt,p.updatedAt FROM user_role ur " +
            " JOIN role_permission rp ON ur.role_id = rp.role_id  " + 
            " JOIN sys_permissions p ON rp.permission_id = p.id  " +
            "  AND p.lang = ? " + 
            " WHERE ur.user_id = ? " +
            " GROUP BY p.id "
            const result: Sys_Permission[] =  await this.sequelize.query(strSql, {
                replacements: [lang, userId],
                type: QueryTypes.SELECT
            });
            return result;
        })
    }

    // "filters": {
    //     "user_name": "NANP",
    //     "password": "Nampham90",
    //     "is_available": true,
    //     "sex": 1,// giơi tinh
    //     "mobile": "0901948123", // sodien thoai
    //     "email": "namphammrk@gmail.com", // email
    //     "department_id": 1, // phong ban
    //     "ids": [1,2,3] // danh sach role
    // }
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

    // "filters": {
    //     "department_id": 0 // 0 find all, 
    // }
    // search all user
    async retrieveAll(searchParams: SearchCondition, pageSize: number , pageNum: number): Promise<T> {
        return await super.execute(async () => {
            let condition :any = {};
            if(searchParams.department_id) {
                condition.department_id = searchParams.department_id;
            }
            const {rows, count} =  await Sys_User.findAndCountAll({where: condition,limit: pageSize, offset: pageSize*( pageNum - 1), attributes: {exclude: ['password']},include: {model: Sys_Department,as: 'sys_departments'}});
            const pageInfo = new PageInfo(count, rows, pageNum, pageSize);
            return pageInfo;
        })
    }

    // "filters": {
    //     "id": 9
    // }
    // tìm kiêm user theo id
    async retrieveById(userId: number): Promise<T> {
        return await super.execute(async () => {
            return await Sys_User.findByPk(userId,{include: ['sys_departments'],attributes: {exclude: ['password']}});
        })
    }

    // update user
    async update(user: Sys_User): Promise<T> {
        // return await super.execute(async () => {
        //     const {user_name, sex, is_available, mobile, roles} = user;
        // })
        return null;
    }

    // "filters": {
    //     "newPassword": "Nampham90",
    //     "oldPassword": "Nampham91"
    // }
    // thay đổi password
    async changePassword(userId: number, newpass: string, oldpass: string): Promise<T> {
        return await super.execute(async () => {
            //console.log(userId);
            const user = await Sys_User.findOne({where: {id: userId}});
            if(user) {
                const checkpassold = await this.checkPasssOld(user, oldpass);
                if(checkpassold) {
                    // update new pass
                    const hasspass = await Bun.password.hash(newpass,{algorithm: "bcrypt", cost: 4});
                    await Sys_User.update({password:hasspass}, {where: {id: user.id}});
                    return 0;
                }
                return 98;
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
    async lockAccount(userId: number): Promise<T> {
        return await super.execute(async () => {
            const result = await Sys_User.update({last_login_time: null},{where: {id:userId}});
            return result[0];
        })
    }

}

export default new SysUserRepo();