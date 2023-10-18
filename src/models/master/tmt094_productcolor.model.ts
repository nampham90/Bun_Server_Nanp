// class Color extends Model {}
// Color.init({
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: DataTypes.STRING(50),
//   }, { sequelize, modelName: 'color' });

// Product.hasMany(ProductVariation, { as: 'variations' });
// ProductVariation.belongsTo(Product, { foreignKey: 'productId' });

// ProductVariation.belongsToMany(Size, { through: 'VariationSize', foreignKey: 'variationId' });
// Size.belongsToMany(ProductVariation, { through: 'VariationSize', foreignKey: 'sizeId' });

// ProductVariation.belongsToMany(Color, { through: 'VariationColor', foreignKey: 'variationId' });
// Color.belongsToMany(ProductVariation, { through: 'VariationColor', foreignKey: 'colorId' });

// Tmt091ProdcutCategory.hasMany(Tmt090Product, {as: 'tmt090_prodcuts'});
// Tmt090Product.belongsTo(Tmt091ProdcutCategory, {
//     foreignKey: "category_id",
//     as: "tmt091_productcategorys",
//     targetKey: 'lang'
// })


// -------------------

// class Order extends Model {}
// Order.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   customerId: DataTypes.INTEGER,
//   orderDate: DataTypes.DATE,
//   orderStatus: DataTypes.STRING(50),
//   totalPrice: DataTypes.DECIMAL(10, 2),
//   shippingAddress: DataTypes.STRING,
// }, { sequelize, modelName: 'order' });

// class Customer extends Model {}
// Customer.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: DataTypes.STRING(100),
//   email: DataTypes.STRING(100),
//   phone: DataTypes.STRING(15),
//   address: DataTypes.STRING,
// }, { sequelize, modelName: 'customer' });

// class OrderDetail extends Model {}
// OrderDetail.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   orderId: DataTypes.INTEGER,
//   productId: DataTypes.INTEGER,
//   quantity: DataTypes.INTEGER,
//   lineTotal: DataTypes.DECIMAL(10, 2),
// }, { sequelize, modelName: 'orderDetail' });

// // Define relationships
// Product.hasMany(ProductVariation, { as: 'variations' });
// ProductVariation.belongsTo(Product, { foreignKey: 'productId' });

// ProductVariation.belongsToMany(Size, { through: 'VariationSize', foreignKey: 'variationId' });
// Size.belongsToMany(ProductVariation, { through: 'VariationSize', foreignKey: 'sizeId' });

// ProductVariation.belongsToMany(Color, { through: 'VariationColor', foreignKey: 'variationId' });
// Color.belongsToMany(ProductVariation, { through: 'VariationColor', foreignKey: 'colorId' });

// Order.hasMany(OrderDetail, { as: 'orderDetails' });
// Product.hasMany(OrderDetail, { as: 'orderDetails' });

// sequelize.sync(); // Synchronize the database with the models
