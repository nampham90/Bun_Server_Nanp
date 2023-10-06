import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: 'sys_permissions'
})
export default class Sys_Permission extends Model {
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
        type: DataType.STRING(50),
        field: "menu_name"
    })
    menu_name?: string;

    @Column({
        type: DataType.STRING(100),
        field: "code"
    })
    code?: string;

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

    @Column({
        type: DataType.STRING(200),
        field: "path"
    })
    path?: number;

    @Column({
        type: DataType.CHAR(1),
        field: "menu_type"
    })
    menu_type?: string;

    @Column({
        type: DataType.CHAR(1),
        field: "visible"
    })
    visible?: string;

    @Column({
        type: DataType.CHAR(1),
        field: "status"
    })
    status?: string;
    
    @Column({
        type: DataType.BOOLEAN,
        field: "is_new_link"
    })
    is_new_link?: boolean;

    @Column({
        type: DataType.STRING(100),
        field: "al_icon"
    })
    al_icon?: string;

    @Column({
        type: DataType.STRING(100),
        field: "icon"
    })
    icon?: string;

}