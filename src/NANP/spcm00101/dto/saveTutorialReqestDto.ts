import { Request } from 'express'
export class SaveTutorialDto {
    private title: string;
    private description: string;
    private published: boolean;

    constructor(req: Request) {
        this.title = req.body.title;
        this.description = req.body.description;
        this.published = req.body.published;
    }

    getTitle(){
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getPublished() {
        return this.published
    }
}