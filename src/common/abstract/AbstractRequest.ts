
import {Request, Response} from "express"

export default class AbstractRequest {
    public userId: number;
    public username: string;
    public lang: string;
    public pageNum: number;
    public pageSize: number;

    constructor(req:Request, res:Response) {
        
        this.lang =  "vi";
        if(res.locals.language) {
            this.lang = res.locals.language;
        }
        this.userId = -1;
        this.username = "";
        if(res.locals.jwtPayload) {
            const {userId,username} = res.locals.jwtPayload;
            this.userId = userId;
            this.username = username;
        }
       
        this.pageNum = req.body.pageNum || 1;
        this.pageSize = req.body.pageSize || 10;
    }
}