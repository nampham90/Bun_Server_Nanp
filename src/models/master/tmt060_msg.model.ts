import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: 'tmt060_msgs'
})
export default class Tmt060Msg extends Model {
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
        field: 'lang'
    })
    lang?: string

    @Column({
        type: DataType.STRING(4),
        field: 'code'
    })
    code?: string

    @Column({
        type: DataType.STRING(255),
        field: 'msg'
    })
    msg?: string
}