import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";


@Table({
    tableName: 'tmt090_products'
})
export default class Tmt090Product extends Model {
    @Column({
        type: DataType.STRING(10),// 2 chu cai dau cua san pham + ngay nhap hang vd PA20231018
        primaryKey: true,
        field: 'itemcd',
        validate: {
          isAlphanumeric: true, // Kiểm tra rằng giá trị là ký tự chữ và số
        },
    })
    itemcd?: string;// mã sản phẩm

    @Column({
        type: DataType.STRING(3),
        primaryKey: true,
        field: 'lang'
    })
    lang?: string


    @Column({
        type: DataType.STRING(100),
        field: 'itemnm'
    })
    itemnm?: string  // tên sản phẩm

    @Column({
        type: DataType.STRING(255),
        field: 'description'/// mo tả sản phẩm
    })
    description?: string

    @Column({
        type: DataType.DECIMAL(10, 2),
        field: 'price'
    })
    price?: number /// giá

    @Column({
        type: DataType.INTEGER,
        field: 'stock'
    })
    stock?: number // tồn kho

    @Column({
        type: DataType.BOOLEAN,
        field: 'is_composite'
    })
    is_composite?: boolean;// đanh dâu sảng phẩm gộp

    @Column({
        type: DataType.STRING(255),
        field: 'image'
    })
    image?: string
}

// class Product extends Model {}
// Product.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: DataTypes.STRING(100),
//   description: DataTypes.STRING,
//   price: DataTypes.DECIMAL(10, 2),
//   stock: DataTypes.INTEGER,
//   is_composite: DATATYPs.Boolen// đanh dâu sảng phẩm gộp
// }, { sequelize, modelName: 'product' });

// Bảng sản phẩm (Products):

// Bảng: wp_woocommerce_products
// Các trường chính:
// product_id (ID sản phẩm)
// product_name (Tên sản phẩm)
// product_description (Mô tả sản phẩm)
// product_price (Giá sản phẩm)
// product_stock (Số lượng tồn kho)
// product_category_id (ID danh mục sản phẩm)
// product_image (Ảnh sản phẩm)
// Bảng danh mục sản phẩm (Product Categories):

// Bảng: wp_woocommerce_categories
// Các trường chính:
// category_id (ID danh mục)
// category_name (Tên danh mục)
// category_description (Mô tả danh mục)
// Bảng đơn hàng (Orders):

// Bảng: wp_woocommerce_orders
// Các trường chính:
// order_id (ID đơn hàng)
// customer_id (ID khách hàng)
// order_date (Ngày đặt hàng)
// order_status (Trạng thái đơn hàng)
// total_price (Tổng giá trị đơn hàng)
// shipping_address (Địa chỉ giao hàng)
// Bảng khách hàng (Customers):

// Bảng: wp_woocommerce_customers
// Các trường chính:
// customer_id (ID khách hàng)
// customer_name (Tên khách hàng)
// customer_email (Email khách hàng)
// customer_phone (Số điện thoại khách hàng)
// customer_address (Địa chỉ khách hàng)
// Bảng chi tiết đơn hàng (Order Details):

// Bảng: wp_woocommerce_order_details
// Các trường chính:
// order_detail_id (ID chi tiết đơn hàng)
// order_id (ID đơn hàng)
// product_id (ID sản phẩm)
// quantity (Số lượng sản phẩm trong đơn hàng)
// line_total (Tổng tiền cho mỗi sản phẩm trong đơn hàng)