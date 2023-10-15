import { Model, Table, Column, DataType, Scopes,BelongsToMany  } from "sequelize-typescript";
import Sys_Permission from "./sys_permission";

@Table({
    tableName: "sys_roles", 
})
@Scopes(() => ({
    permissions: {
        include: [
            {
                model: Sys_Permission,
                through: { attributes: [] }, // Đảm bảo không lấy thông tin về bảng liên kết
            },
        ],
    },
}))
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

    @BelongsToMany(() => Sys_Permission, 'role_permission', 'role_id', 'permission_id')
    permissions!: Sys_Permission[];

}