import Sys_Department from "@models/system/sys_department";
import Sys_Role from "@models/system/sys_role.model";
import Sys_User from "@models/system/sys_user.model";

interface SearchCondition {
    department_id?: number;
}

interface ISysUserRepo {
    save(department_id: number,user: Sys_User, roleIds: number[]) : Promise<Sys_User | null> ;
    addUserRoles(userId: number, roleIds: number[]): Promise<void> ;
    retrieveAll(searchParams: {department_id: number}): Promise<Sys_User[]>;
    retrieveById(userId: number): Promise<Sys_User | null>;
    update(user: Sys_User): Promise<number>;
    changePassword(newpass:string) : Promise<number>;
    lockAccount(): Promise<number>;
}

class SysUserRepo implements ISysUserRepo {

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
            console.log(error);
            throw new Error("Method not implemented.");
        }
    }

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
            throw new Error("Method not implemented.");
        }
    }

    async retrieveAll(searchParams: { department_id: number; }): Promise<Sys_User[]> {
        throw new Error("Method not implemented.");
    }

    async  retrieveById(userId: number): Promise<Sys_User | null> {
        try {
            return await Sys_User.findByPk(userId, {include: ['sys_departments']});
        } catch (error) {
            throw new Error("Method not implemented.");
        }
       
    }

    async update(user: Sys_User): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async changePassword(newpass: string): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async lockAccount(): Promise<number> {
        throw new Error("Method not implemented.");
    }

}

export default new SysUserRepo();