import AbstractRepository from "@common/abstract/AbstractRepository";
import { PageInfo } from "@common/pageHelper/PageInfo";
import Sys_Department from "@models/system/sys_department";
import { Op , Sequelize} from "sequelize";

interface SearchCondition {
    [key: string]: any;
}

interface ISysDepartmentRepo<T> {
    save(department: Sys_Department): Promise<T>;
    retrieveAll(searchParams: {department_name:string}): Promise<T>;
    retrieveById(departmentId: number): Promise<T>;
    update(department: Sys_Department): Promise<T>;
    delete(departmentId: number): Promise<T>;
    deleteAll(): Promise<T>
}
type T = Sys_Department | null | PageInfo<Sys_Department> | number
class SysDepartmentRepo extends AbstractRepository<T> implements ISysDepartmentRepo<T> {
    
    // "filters":{
    //     "department_name": "Quản lý khách hang",
    //     "state": true,
    //     "father_id": 0,
    //     "order_num": 1
    // }
    // save department
    async save(department: Sys_Department): Promise<T> {
        return await super.execute(async ()=> {
                return await Sys_Department.create({
                lang: department.lang,
                department_name: department.department_name,
                state: department.state,
                father_id: department.father_id,
                order_num: department.order_num
            });
        })
    }

    // {
    //     "pageSize": 10,
    //     "pageNum": 1,
    //     "filters":{
    //         "department_name": ""
    //     }
    // }
    // search department
    async retrieveAll(searchParams: { department_name: string, pageSize: number, pageNum: number}): Promise<T>{
        return await super.execute(async () => {
            let condition: SearchCondition = {}
            if(searchParams?.department_name)
            condition.department_name = { [Op.like]: `%${searchParams.department_name}%` };
            const {rows, count} = await Sys_Department.findAndCountAll({where: condition,limit: searchParams.pageSize, offset:(searchParams.pageNum - 1)*searchParams.pageSize});
            const pageInfo = new PageInfo(count,rows,searchParams.pageNum,searchParams.pageSize);
            return pageInfo;
        })
    }
    
    // "filters":{
    //     "department_id": 28
    // }
    // get department id
    async retrieveById(departmentId: number): Promise<T> {
        return await super.execute(async () => {
            return await Sys_Department.findByPk(departmentId);
        })
    }

    // "filters":{
    //     "id": 28,
    //     "department_name": "Quản lý nhân sự",
    //     "state": true,
    //     "father_id": 0,
    //     "order_num": 1
    // }
    // update department
    async update(department: Sys_Department): Promise<T> {
        return await super.execute(async () => {
            const {id,department_name, state, father_id, order_num} = department;
            const affectedRows = await Sys_Department.update(
                {department_name, state, father_id, order_num},
                {where: {id: id}});
            return affectedRows[0];
        })        
    }

    // "filters":{
    //      "department_id": 29
    // }
    // delete department id
    async delete(departmentId: number): Promise<T> {
        return await super.execute(async () => {
            const affectedRows = await Sys_Department.destroy({where: {id: departmentId}});
            return affectedRows;
        })        
    }

    // "filters":{
    // }
    // delete all department
    async deleteAll(): Promise<T> {
       return await super.execute(async () => {
          return Sys_Department.destroy({where: {}, truncate: false});
       })
    }

}

export default new SysDepartmentRepo();