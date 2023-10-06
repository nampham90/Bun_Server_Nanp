import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: 'sys_departments'
})
export default class Sys_Department extends Model {
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
        field: "department_name"
    })
    department_name?: string;

    @Column({
        type: DataType.BOOLEAN,
        field: "state"
    })
    state?: boolean;

    @Column({
        type: DataType.INTEGER,
        field: "father_id"
    })
    father_id?: number;

    @Column({
        type: DataType.INTEGER,
        field: "order_num"
    })
    order_num?: number;

}