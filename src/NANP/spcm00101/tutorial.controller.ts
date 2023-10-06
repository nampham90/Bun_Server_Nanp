
import {Request, Response} from 'express';

import Tutorial from '@models/tutorial.model';
import { SaveTutorialDto } from './dto/saveTutorialReqestDto';
import TutorialRepo from './spcm00101.repo';
import { Result } from '@common/result/Result';
import { ErrorEnum } from '@common/enums/ErrorCodeEnum';

export default class TutorialController {
    async create(req: Request, res: Response) {
        try {
            const tutorial: Tutorial = req.body;
            console.log(tutorial);
            const saveTutorial = await TutorialRepo.save(tutorial);
            res.status(200).send(Result.success(saveTutorial));
        } catch (error) {
            res.status(500).send(Result.failureCode(ErrorEnum.SYS_ERR_GLOBAL));
        }
    }

    async update(req:Request, res: Response) {
        try {
            const tutorial: Tutorial = req.body;
            console.log(tutorial);
            const update = await TutorialRepo.update(tutorial);
            res.status(200).send(Result.success(update));
        } catch (error) {
            res.status(500).send(Result.failureCode(ErrorEnum.SYS_ERR_GLOBAL));
        }
    }
}