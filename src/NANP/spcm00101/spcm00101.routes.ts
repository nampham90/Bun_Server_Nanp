import {Router} from 'express';
import Spmt00101Controller from './spcm00101.controller';

class Spcm00101Routes {
   router = Router();

   spmt00101Controller = new Spmt00101Controller();

   constructor() {
        this.intializeRoutes();
   }

   intializeRoutes() {
        this.router.post("/login", this.spmt00101Controller.login);
   }
}

export default new Spcm00101Routes().router;