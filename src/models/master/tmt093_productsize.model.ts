// class Size extends Model {}
// Size.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: DataTypes.STRING(50),
// }, { sequelize, modelName: 'size' });

import { Model, Table, Column, DataType } from "sequelize-typescript";



@Table({
    tableName: 'tmt093_productsizes'
})
export default class Tmt093ProdcutSize extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    })
    id?: number;

    @Column({
        type: DataType.STRING(50),
        field: 'name'
    })
    name?: string
}
