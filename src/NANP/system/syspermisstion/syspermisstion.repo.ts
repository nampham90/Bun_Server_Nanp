import Sys_Permission from '@models/system/sys_permission';

interface ISysPermisstionRepo {
    save(permesstion: Sys_Permission): Promise<Sys_Permission | null>;
    retrieveAll(searchParams: {department_id: number}): Promise<Sys_Permission[]>;
    retrieveById(permessionId: number): Promise<Sys_Permission | null>;
    update(permesstion: Sys_Permission): Promise<number>;
    delete(permessionId: number): Promise<number>;
    deleteAll(): Promise<number>
}

class SysPermissionRepo implements ISysPermisstionRepo {
    save(permesstion: Sys_Permission): Promise<any> {
        throw new Error('Method not implemented.');
    }
    retrieveAll(searchParams: { department_id: number; }): Promise<Sys_Permission[]> {
        throw new Error('Method not implemented.');
    }
    retrieveById(permessionId: number): Promise<any> {
        throw new Error('Method not implemented.');
    }
    update(permesstion: Sys_Permission): Promise<number> {
        throw new Error('Method not implemented.');
    }
    delete(permessionId: number): Promise<number> {
        throw new Error('Method not implemented.');
    }
    deleteAll(): Promise<number> {
        throw new Error('Method not implemented.');
    }

}

export default new SysPermissionRepo();