import Logger from "@common/log/logtofile";
import Sys_Permission from "@models/system/sys_permission";
import Sys_Role from "@models/system/sys_role.model";
import db from '@db/index';
import { QueryTypes } from "sequelize";
import AbstractRepository from "@common/abstract/AbstractRepository";

interface PermissionItem {
    permissionCode: string;
}
interface ISysRoleRepo<T> {

    save(role: Sys_Role,lang:string): Promise<T>;
    retrieveAll(lang:string): Promise<T>;
    retrieveById(roleId: number, lang:string): Promise<T>;
    update(role: Sys_Role, lang: string): Promise<T>;
    delete(roleId: number, lang:string): Promise<T>;
    deleteAll(lang:string): Promise<number>
    updateRolePermissions(roleId:number, lstPermission: number[]) : Promise<T>;
    getPermissionRole(roleId: number, lang: string) : Promise<T>;
}

type T = number | Sys_Role | null | Sys_Role[] | string[];

class SysRoleRepo extends AbstractRepository<T> implements ISysRoleRepo<T> {


    async save(role: Sys_Role, lang:string): Promise<T> {
        return await super.execute( async () => {
            const {role_name, role_desc} = role; 
            return await Sys_Role.create({
                lang: lang,
                role_name: role_name,
                role_desc: role_desc
            });
        })
    }

    async retrieveAll(lang: string): Promise<T> {
        return await super.execute(async () => {
            return await Sys_Role.findAll({where: {lang: lang}});
        })
    }

    async retrieveById(roleId: number, lang: string): Promise<T> {
        return await super.execute(async () => {
            return await Sys_Role.findOne({where: {id: roleId, lang:lang}});
        })        
    }

    async update(role: Sys_Role, lang: string): Promise<T> {
        return await super.execute(async () => {
            const {id, role_name , role_desc} = role;
            const affectedRows = await Sys_Role.update({role_name, role_desc},{where: {id:id,lang:lang}});
            return affectedRows[0]
        })
    }

    async delete(roleId: number, lang: string): Promise<T> {
        return await super.execute(async () => {
            const affectedRows = await Sys_Role.destroy({where: {id:roleId, lang: lang}});
            return affectedRows;
        })
    }

    async deleteAll(lang: string): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async updateRolePermissions(roleId:number, lstPermission: number[]): Promise<T> {
        const t = await this.sequelize.transaction(); // băt đầu giao dịch
        return await super.execute(async () => {
          
            // Xóa tất cả permissions của role
            await Sys_Role.update(
                { permissions: [] }, // Cập nhật danh sách permissions thành một mảng rỗng
                { where: { id: roleId }, transaction: t }
            );

            // Chèn các permissions mới vào role
            const role = await Sys_Role.findByPk(roleId, { transaction: t });
            if (role) {
                await role.$set('permissions', lstPermission, { transaction: t });
            } else {
                return 99;
            }
            return 0;
        }, t)
    }

    async getPermissionRole(roleId: number, lang:string): Promise<T> {
        let lstPermission: string[] = [];
        return await super.execute( async () => {
            const strsql =  " SELECT p.code AS permissionCode FROM sys_roles r " +
                            " LEFT JOIN role_permission rp ON r.id = rp.role_id " +
                            " LEFT JOIN sys_permissions p ON rp.permission_id = p.id " +
                            " AND p.lang = ? " +
                            " WHERE r.id = ? "
            const result = await this.sequelize.query(strsql,{
                replacements: [lang,roleId],
                type: QueryTypes.SELECT
            })
            if(result) {
                const data: PermissionItem[] = result as PermissionItem[];
                lstPermission = data.map(item => item.permissionCode)
            }
            return lstPermission;
        })
    }

}

export default new SysRoleRepo();