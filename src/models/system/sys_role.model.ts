import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "sys_roles", 
})
export default class Sys_Role extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    })
    id?: number;

    @Column({
        type: DataType.STRING(3),
        primaryKey: true,
        field: "lang"
    })
    lang?: string;

    @Column({
        type: DataType.STRING(50),
        field: "role_name"
    })
    role_name?: string;

    @Column({
        type: DataType.STRING(255),
        field: "role_desc"
    })
    role_desc?: string;
}