import Sys_User from "@models/system/sys_user.model";

import {} from 'sequelize'

interface SearchCondition {
    department_id?: number;
}

interface ISysUserRepo {
    save(user: Sys_User) : Promise<Sys_User> ;
    retrieveAll(searchParams: {department_id: number}): Promise<Sys_User[]>;
    retrieveById(userId: number): Promise<Sys_User>;
    update(user: Sys_User): Promise<number>;
    changePassword(newpass:string) : Promise<number>;
    lockAccount(): Promise<number>;
}

class SysUserRepo implements ISysUserRepo {

    async save(user: Sys_User): Promise<Sys_User> {
        try {
            return await Sys_User.create({
                user_name: user.user_name,
                password: user.password,
                is_avlilable: user.is_available,
                sex: user.sex,
                mobile: user.mobile,
                last_login_time: user.last_login_time,
            });
        } catch (error) {
            throw new Error("Method not implemented.");
        }
        
    }

    retrieveAll(searchParams: { department_id: number; }): Promise<Sys_User[]> {
        throw new Error("Method not implemented.");
    }

    retrieveById(userId: number): Promise<Sys_User> {
        throw new Error("Method not implemented.");
    }

    update(user: Sys_User): Promise<number> {
        throw new Error("Method not implemented.");
    }

    changePassword(newpass: string): Promise<number> {
        throw new Error("Method not implemented.");
    }

    lockAccount(): Promise<number> {
        throw new Error("Method not implemented.");
    }

}

export default new SysUserRepo();