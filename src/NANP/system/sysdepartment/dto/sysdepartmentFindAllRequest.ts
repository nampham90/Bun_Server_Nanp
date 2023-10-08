
import AbstractRequest from "@common/abstract/AbstractRequest";
import { Request, Response} from "express"

export default class SysDepartmentFindAllRequest extends AbstractRequest {
    public department_name: string;
    constructor(req:Request,res: Response){
        super(req,res);
        this.department_name = "";
        if(req.body.condition) {
            this.department_name = req.body.condition.department_name;
        }
        
    }
}