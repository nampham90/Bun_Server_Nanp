import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: 'sys_users'
})
export default class Sys_User extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    })
    id?: number;

    @Column({
        type: DataType.STRING(20),
        field: "user_name"
    })
    user_name?: string;

    @Column({
        type: DataType.STRING(255),
        field: "password"
    })
    password?: string;

    @Column({
        type: DataType.BOOLEAN,
        field: "is_available"
    })
    is_available?: boolean;

    @Column({
        type: DataType.INTEGER,
        field: "sex"
    })
    sex?: number;


    @Column({
        type: DataType.BIGINT,
        field: "mobile"
    })
    mobile?: string;

    
    @Column({
        type: DataType.STRING(50),
        field: "email"
    })
    email?: string;

    @Column({
        type: DataType.DATE,
        field: "last_login_time"
    })
    last_login_time?: Date;

}