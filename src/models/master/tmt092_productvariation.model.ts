// class ProductVariation extends Model {}
// ProductVariation.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   productId: DataTypes.INTEGER,
//   name: DataTypes.STRING(50),
//   price: DataTypes.DECIMAL(10, 2),
//   stock: DataTypes.INTEGER,
// }, { sequelize, modelName: 'productVariation' });


// Để lưu trữ thông tin về biến thể sản phẩm, chẳng hạn như kích thước (size) và màu sắc trong cơ sở dữ liệu của WooCommerce, bạn có thể sử dụng các bảng sau:

// Bảng biến thể sản phẩm (Product Variations):

// Bảng: wp_woocommerce_product_variations
// Các trường chính:
// variation_id (ID biến thể)
// product_id (ID sản phẩm cha)
// variation_name (Tên biến thể, ví dụ: "Large", "Red")
// variation_price (Giá của biến thể, nếu khác giá của sản phẩm cha)
// variation_stock (Số lượng tồn kho cho biến thể)
// variation_image (Ảnh biến thể)
// Bảng kết nối giữa sản phẩm và biến thể (Product-to-Variation Relationship):

// Bảng: wp_woocommerce_product_variation_relationship
// Các trường chính:
// relationship_id (ID kết nối)
// product_id (ID sản phẩm cha)
// variation_id (ID biến thể)
// Bảng kích thước (Size):

// Bảng: wp_woocommerce_sizes
// Các trường chính:
// size_id (ID kích thước)
// size_name (Tên kích thước, ví dụ: "Small", "Medium", "Large")
// Bảng màu sắc (Color):

// Bảng: wp_woocommerce_colors
// Các trường chính:
// color_id (ID màu sắc)
// color_name (Tên màu sắc, ví dụ: "Red", "Blue", "Green")
