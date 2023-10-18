import { Model, Table, Column, DataType } from "sequelize-typescript";



@Table({
    tableName: 'tmt091_productcategorys'
})
export default class Tmt091ProdcutCategory extends Model {
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
        type: DataType.STRING(100),
        field: 'name'
    })
    name?: string

    @Column({
        type: DataType.STRING,
        field: 'description'
    })
    description?: string

}