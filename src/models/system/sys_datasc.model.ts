import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: 'sys_datascs'
})
export default class Sys_Datasc extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    })
    id?: number;

    @Column({
        type: DataType.STRING(3),
        primaryKey: true,
        field: "lang"
    })
    lang?: string;

    @Column({
        type: DataType.STRING(255),
        field: "title1"
    })
    title1?: string;

    @Column({
        type: DataType.STRING(255),
        field: "title2"
    })
    title2?: string;

    @Column({
        type: DataType.INTEGER,
        field: "location"
    })
    location?: number;


    @Column({
        type: DataType.BOOLEAN,
        field: "status"
    })
    status?: boolean;

}
