import { Model, Table, Column, DataType } from "sequelize-typescript";



@Table({
    tableName: 'tmt020_videoyoutubes'
})
export default class Tmt020VideoYoutubes extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    })
    id?: number;

    @Column({
        type: DataType.STRING(3),
        field: 'lang'
    })
    lang?: string

    @Column({
        type: DataType.STRING(10),
        field: 'idyoutube'
    })
    idyoutube?: string

    @Column({
        type: DataType.STRING(20),
        field: 'urldisplayid'
    })
    urldisplayid?: string

    @Column({
        type: DataType.STRING(255),
        field: 'title'
    })
    title?: string

    @Column({
        type: DataType.STRING(255),
        field: 'content'
    })
    content?: string
}
