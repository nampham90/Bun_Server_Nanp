import { Request, Response, NextFunction } from "express";

import Sys_User from "@models/system/sys_user.model";



export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = res.locals.jwtPayload.userId;

    }
}