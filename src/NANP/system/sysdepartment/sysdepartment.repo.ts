import Sys_Department from "@models/system/sys_department";
import { Op } from "sequelize";

interface SearchCondition {
    [key: string]: any;
}

interface ISysDepartmentRepo {
    save(department: Sys_Department): Promise<Sys_Department>;
    retrieveAll(searchParams: {department_name:string}): Promise<Sys_Department[]>;
    retrieveById(departmentId: number): Promise<Sys_Department | null>;
    update(department: Sys_Department): Promise<number>;
    delete(departmentId: number): Promise<number>;
    deleteAll(): Promise<number>
}

class SysDepartmentRepo implements ISysDepartmentRepo {
    async save(department: Sys_Department): Promise<Sys_Department> {
        try {
            return await Sys_Department.create({
                lang: department.lang,
                department_name: department.department_name,
                state: department.state,
                father_id: department.father_id,
                order_num: department.order_num
            });
        } catch (error) {
            throw new Error("Failed to create Sys_Department.");
        }
    }
    async retrieveAll(searchParams: { department_name: string}): Promise<Sys_Department[]> {
        try {
            let condition: SearchCondition = {}
            if(searchParams?.department_name)
               condition.department_name = { [Op.like]: `%${searchParams.department_name}%` };
            return await Sys_Department.findAll({where: condition});
        } catch (error) {
            throw new Error("Failed to retrieve Tutorials!");
        }
        
    }
    async retrieveById(departmentId: number): Promise<Sys_Department | null> {
        try {
            return await Sys_Department.findByPk(departmentId);
        } catch (error) {
            throw new Error("Failed to retrieve Tutorials!.");
        }
       
    }
    async update(department: Sys_Department): Promise<number> {
        const {id,department_name, state, father_id, order_num} = department;
        try {
            const affectedRows = await Sys_Department.update(
                {department_name, state, father_id, order_num},
                {where: {id: id}});
                return affectedRows[0];
        } catch (error) {
            throw new Error("Method not implemented.");
        }
        
    }
    async delete(departmentId: number): Promise<number> {
        try {
            const affectedRows = await Sys_Department.destroy({where: {id: departmentId}});
            return affectedRows;
        } catch (error) {
            throw new Error("Method not implemented.");
        }
        
    }
    async deleteAll(): Promise<number> {
        try {
            return Sys_Department.destroy({where: {}, truncate: false});
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }

}

export default new SysDepartmentRepo();