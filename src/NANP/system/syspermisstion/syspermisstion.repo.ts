import Sys_Permission from '@models/system/sys_permission';

interface ISysPermisstionRepo {
    save(permesstion: Sys_Permission): Promise<Sys_Permission | null>;
    retrieveAll(lang:string): Promise<Sys_Permission[]>;
    retrieveFatherId(father_id: number): Promise<Sys_Permission[]>;
    retrieveById(permessionId: number, lang:string): Promise<Sys_Permission | null>;
    update(permesstion: Sys_Permission, lang: string): Promise<number>;
    delete(permessionId: number, lang:string): Promise<number>;
    deleteAll(): Promise<number>
}

class SysPermissionRepo implements ISysPermisstionRepo {
    async save(permesstion: Sys_Permission): Promise<Sys_Permission> {
        try {
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
        } catch (error) {
            throw new Error('Method not implemented.');
        }
        
    }
    async retrieveAll(lang:string):Promise<Sys_Permission[]> {
        try {
            return await Sys_Permission.findAll({where: {lang:lang}});
        } catch (error) {
            throw new Error('Method not implemented.');
        }
        
    }
    
    async retrieveFatherId(father_id: number): Promise<Sys_Permission[]> {
        throw new Error('Method not implemented.');
    }
    
    async retrieveById(permessionId: number,lang:string): Promise<any> {
        try {
            return await Sys_Permission.findOne({where: {id: permessionId,lang: lang}});
        } catch (error) {
            throw new Error('Method not implemented.');
        }
       
    }

    // upate menu
    async update(permesstion: Sys_Permission, lang: string): Promise<number> {
        const {id, menu_name, code, father_id, order_num, path, menu_type, visible, status, is_new_link, al_icon, icon } = permesstion;
        try {
            const affectedRows = await Sys_Permission.update({menu_name,code,order_num,path,menu_type,visible,status,is_new_link,al_icon,icon}, {where: {id: id, lang: lang}});
            return affectedRows[0];
        } catch (error) {
            throw new Error('Method not implemented.');
        }
       
    }

    // delete menu
    async delete(permessionId: number,lang: string): Promise<number> {
        try {
            const affectedRows = await Sys_Permission.destroy({where: {id: permessionId, lang: lang}});
            return affectedRows;
        } catch (error) {
            throw new Error('Method not implemented.');
        }
       
    }

    // delete all
    async deleteAll(): Promise<number> {
        throw new Error('Method not implemented.');
    }

}

export default new SysPermissionRepo();