import AbstractRepository from '@common/abstract/AbstractRepository';
import Sys_Permission from '@models/system/sys_permission';

interface ISysPermisstionRepo<T> {
    save(permesstion: Sys_Permission): Promise<T>;
    retrieveAll(lang:string): Promise<T>;
    retrieveFatherId(father_id: number): Promise<T>;
    retrieveById(permessionId: number, lang:string): Promise<T>;
    update(permesstion: Sys_Permission, lang: string): Promise<T>;
    delete(permessionId: number, lang:string): Promise<T>;
    deleteAll(): Promise<T>
}
type T = Sys_Permission | Sys_Permission[] | number | null
class SysPermissionRepo extends AbstractRepository<T> implements ISysPermisstionRepo<T> {
    async save(permesstion: Sys_Permission): Promise<T> {
        return await super.execute(async () => {
            return await Sys_Permission.create({
                lang: permesstion.lang,
                menu_name: permesstion.menu_name,
                code: permesstion.code,
                father_id: permesstion.father_id,
                order_num: permesstion.order_num,
                path: permesstion.path,
                menu_type: permesstion.menu_type,
                visible: permesstion.visible,
                status: permesstion.status,
                is_new_link: permesstion.is_new_link,
                al_icon: permesstion.al_icon,
                icon: permesstion.icon
            })
        })
    }

    // "filters":{
    // }
    async retrieveAll(lang:string):Promise<T> {
        return await super.execute(async ()=> {
            return await Sys_Permission.findAll({where: {lang:lang}});
        })        
    }
    
    async retrieveFatherId(father_id: number): Promise<Sys_Permission[]> {
        throw new Error('Method not implemented.');
    }
    
    // "filters":{
    //     "id": 1
    // }
    async retrieveById(permessionId: number,lang:string): Promise<T> {
        return await super.execute(async () => {
            return await Sys_Permission.findOne({where: {id: permessionId,lang: lang}});
        })       
    }

    // upate menu
    async update(permesstion: Sys_Permission, lang: string): Promise<T> {
        return await super.execute(async () => {
            const {id, menu_name, code, father_id, order_num, path, menu_type, visible, status, is_new_link, al_icon, icon } = permesstion;
            const affectedRows = await Sys_Permission.update({menu_name,code,order_num,path,menu_type,visible,status,is_new_link,al_icon,icon}, {where: {id: id, lang: lang}});
            return affectedRows[0];
        })  
    }

    // delete menu
    async delete(permessionId: number,lang: string): Promise<T> {
        return await super.execute(async () => {
            const affectedRows = await Sys_Permission.destroy({where: {id: permessionId, lang: lang}});
            return affectedRows;
        }) 
    }

    // delete all
    async deleteAll(): Promise<number> {
        throw new Error('Method not implemented.');
    }

}

export default new SysPermissionRepo();