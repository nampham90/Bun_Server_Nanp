import Sys_Permission from '@models/system/sys_permission';

interface ISysPermisstionRepo {
    save(permesstion: Sys_Permission): Promise<Sys_Permission | null>;
    retrieveAll(): Promise<Sys_Permission[]>;
    retrieveFatherId(father_id: number): Promise<Sys_Permission[]>;
    retrieveById(permessionId: number): Promise<Sys_Permission | null>;
    update(permesstion: Sys_Permission): Promise<number>;
    delete(permessionId: number): Promise<number>;
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
    async retrieveAll():Promise<Sys_Permission[]> {
        try {
            return await Sys_Permission.findAll();
        } catch (error) {
            throw new Error('Method not implemented.');
        }
        
    }
    
    async retrieveFatherId(father_id: number): Promise<Sys_Permission[]> {
        throw new Error('Method not implemented.');
    }
    
    async retrieveById(permessionId: number): Promise<any> {
        try {
            return await Sys_Permission.findByPk(permessionId);
        } catch (error) {
            throw new Error('Method not implemented.');
        }
       
    }
    async update(permesstion: Sys_Permission): Promise<number> {
        throw new Error('Method not implemented.');
    }
    async delete(permessionId: number): Promise<number> {
        throw new Error('Method not implemented.');
    }
    async deleteAll(): Promise<number> {
        throw new Error('Method not implemented.');
    }

}

export default new SysPermissionRepo();