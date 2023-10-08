
import {Request, Response} from "express"

export default class AbstractRequest {
    public userId: number;
    public lang: string;
    public pageNum: number;
    public pageSize: number;

    constructor(req:Request, res:Response) {
        const {userId, lang} = res.locals;
        this.lang =  "vi";
        if(lang && lang != "") {
            this.lang = lang;
        } 
        this.userId = userId  | 0;
        if(userId && userId != 0) {
            this.userId = userId;
        }
        
        this.pageNum = req.body.pageNum || 1;
        this.pageSize = req.body.pageSize || 10;
    }
}