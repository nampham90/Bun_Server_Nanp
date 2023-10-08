import { Request, Response, NextFunction } from "express";

export const checkCode = (code: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = res.locals.jwtPayload.userId;

    }
}