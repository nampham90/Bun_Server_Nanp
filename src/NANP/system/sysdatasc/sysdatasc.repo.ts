import AbstractRepository from "@common/abstract/AbstractRepository";
import { PageInfo } from "@common/pageHelper/PageInfo";
import Sys_Datasc from "@models/system/sys_datasc.model";



interface ISysDatascRepo<T> {
    save(lstdataInsert: Sys_Datasc[]): Promise<T>;
    retrieveAll(permissionId: number, lang:string, pageNum: number, pageSize: number): Promise<T>;
    retrieveById(datascId: number, lang:string): Promise<T>;
    update(datasc: Sys_Datasc, lang: string): Promise<T>;
    delete(datascId: number, lang:string): Promise<T>;
}
type T = Sys_Datasc[] | Sys_Datasc | null | number | PageInfo<Sys_Datasc>
class SysDatascRepo extends AbstractRepository<T> implements ISysDatascRepo<T> {

    // "lstdatascInsert": [
    //     {
    //         "lang": "vi",
    //         "title1": "Trang chủ",
    //         "title2": "Trang chủ",
    //         "location": 1,
    //         "status": true,
    //         "permission_id": 40
    //     },
    //     {
    //         "lang": "vi",
    //         "title1": "Dashboard",
    //         "title2": "Dashboard",
    //         "location": 2,
    //         "status": true,
    //         "permission_id": 40
    //     }
    // ]

    async save(lstdataInsert: Sys_Datasc[]): Promise<T> {
        return await super.execute(async () => {
            const partialSysDatascs: Partial<Sys_Datasc>[] = lstdataInsert.map((sysdatasc)=> {
                 const partialSysDatasc : Partial<Sys_Datasc> = sysdatasc;
                 return partialSysDatasc;
            })
            const addlistDatasc = await Sys_Datasc.bulkCreate(partialSysDatascs);
            return addlistDatasc;
        })
    }

    //search theo menu
    async retrieveAll(permissionId: number,lang: string, pageNum: number, pageSize: number): Promise<T> {
        return await super.execute(async () => {
            const {rows, count} = await Sys_Datasc.findAndCountAll({where: {permission_id: permissionId, lang:lang},limit: pageSize, offset: (pageNum - 1) * pageSize});
            const pageInfo = new PageInfo(count,rows,pageNum,pageSize);
            return pageInfo;
        })
    }

    async retrieveById(datascId: number, lang: string): Promise<T> {
        return await super.execute(async () => {
            return await Sys_Datasc.findOne({where: {id: datascId,lang: lang}});
        })
    }

    async update(datasc: Sys_Datasc, lang: string): Promise<T> {
        return await super.execute(async () => {
            const { id, title1, title2, location, status} = datasc;
            const updateOne = await Sys_Datasc.update({title1,title2,location,status}, {where:{id: id,lang: lang}}); 
            return updateOne[0];
        })
    }

    async delete(datascId: number, lang: string): Promise<T> {
        return await super.execute(async () => {
            return await Sys_Datasc.destroy({where : {id: datascId, lang: lang}});
        })
    }

}

export default new SysDatascRepo();