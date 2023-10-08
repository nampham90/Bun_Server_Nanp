import { Request, Response } from 'express';
import { RequestDTO } from './requestDto';

export default abstract class AbstractController {

     private pageSize: number;
     private pageNum: number;

     constructor(req: Request, res: Response) {
         this.pageSize =  10;
         this.pageNum =  1
     }

     getPageSize() {
        return this.pageSize;
     }

     getPageNum() {
        return this.pageNum;
     }

     abstract handleRequest(req: Request, res: Response): Promise<void>;  
    
  }