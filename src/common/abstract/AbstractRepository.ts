import Logger from "@common/log/logtofile";
import Database from "@db";
import { Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";
export default class AbstractRepository<T> {
    public logger!: Logger;
    public sequelize!: Sequelize;
    protected db!:Database;
    constructor() {

        this.logger = new Logger();
    }

    protected async execute(callback: ()=> Promise<T>, t?:Transaction) {
        try {
            this.db = new Database();
            if(this.db.sequelize) {
                this.sequelize = this.db.sequelize;
            }
            const result = await callback();
            if(t && result === 99) {
                t.rollback();
            }
            if(t) {
                t.commit();
            }
            return result;
        } catch (error) {
            await this.logger.logError(error);
            if(t) {
                t.rollback();
            }
            throw new Error("Error truy vấn hệ thống");
        }
    }
}