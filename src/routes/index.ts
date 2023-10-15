import {Application} from 'express';
import spcm00101Routes from '@nanp/spcm00101/spcm00101.routes';
import sysuserRoutes from '@nanp/system/sysuser/sysuser.routes';
import sysdepartmentRoutes from '@nanp/system/sysdepartment/sysdepartment.routes';
import SysPermissionRoutes from '@nanp/system/syspermisstion/syspermisstion.routes'
import sysroleRoutes from '@nanp/system/sysrole/sysrole.routes';
import sysdatascRoutes from '@nanp/system/sysdatasc/sysdatasc.routes';

export default class Routes {
    constructor(app:Application) {
        // routes child system
        app.use("/api", spcm00101Routes);

        // route Sys Department
        app.use("/api/phongban", sysdepartmentRoutes);

        // // route sysuser
        app.use("/api/user", sysuserRoutes);

        // // route sysrole
        app.use("/api/role", sysroleRoutes);

        // // route syspermission
        app.use("/api/menu", SysPermissionRoutes);

        // // route Sys DataSc
        app.use("/api/screenpc", sysdatascRoutes);

        // router child prodcut


    }
}