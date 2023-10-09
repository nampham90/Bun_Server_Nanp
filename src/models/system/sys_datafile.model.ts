import { Model, Table, Column, DataType } from "sequelize-typescript";



@Table({
    tableName: 'sys_datafiles'
})
export default class Sys_Datafile extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    })
    id?: number;

    @Column({
        type: DataType.STRING(50),
        field: 'filename'
    })
    filename?: string

    @Column({
        type: DataType.STRING(255),
        field: 'path'
    })
    path?: string

    @Column({
        type: DataType.STRING(10),
        field: 'sizefile'
    })
    sizefile?: string
}
