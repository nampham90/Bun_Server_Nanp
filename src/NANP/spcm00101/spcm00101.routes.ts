import {Router} from 'express';
import { login } from '@nanp/spcm00101/spcm00101.controller';
import TutorialController from '@nanp/spcm00101/tutorial.controller'
import SysDepartmentController from '@nanp/system/sysdepartment/sysdepartment.controller';

class Spcm00101Routes {
   router = Router();

   tutorialController = new TutorialController();
   sysDepartmentController = new SysDepartmentController();

   constructor() {
        this.intializeRoutes();
   }

   intializeRoutes() {
        this.router.post("/login", login);
        this.router.post("/tutorialsave", this.tutorialController.create)
        this.router.post("/tutorialupdate", this.tutorialController.update)
   }
}

export default new Spcm00101Routes().router;