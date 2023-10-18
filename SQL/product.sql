INSERT INTO `tmt091_productcategorys` (`id`, `lang`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
	(1, 'vi', 'Bàn phím', 'Danh mục bàn phím', '2023-10-18 12:56:52', '2023-10-18 12:56:53');

    // id danh muc, ma san pham, lang,  giá, soluong, size, mau
    // 1,          231018,        vi,   1200,  10,     1,    1,
    // 1,          231018,        vi,   1200,  10,     2,    2,
    // 2,          231019,        vi,   1700,  10,     1,    3,
    // 2,          231019,        vi,   1500,  10,     1,    3
	
INSERT INTO `tmt090_products` (`itemcd`, `lang`, `itemnm`, `description`, `price`, `stock`, `is_composite`, `image`, `createdAt`, `updatedAt`, `Tmt091ProdcutCategoryId`, `category_id`) VALUES
	('231018', 'vi', 'Bàn phím demo', 'Bàn phím demo', 120.00, 1000, 0, 'NULL', '2023-10-18 12:55:31', '2023-10-18 12:55:32', 1, 'vi');

INSERT INTO `tmt092_productvariations` (`id`, `lang`, `name`, `price`, `stock`, `image`, `createdAt`, `updatedAt`, `Tmt090ProductItemcd`, `product_id`) VALUES
	(1, 'vi', 'Bàn phim màu trắng - size s', 120.00, 400, NULL, '2023-10-18 13:00:40', '2023-10-18 13:00:41', '231018', '018'),
	(2, 'vi', 'Bàn phím màu xanh - size s', 120.00, 400, NULL, '2023-10-18 13:02:30', '2023-10-18 13:02:30', '231018', '018'),
	(3, 'vi', 'Bàn phím màu tráng - size L', 120.00, 100, NULL, '2023-10-18 13:04:42', '2023-10-18 13:04:43', '231018', '018'),
	(4, 'vi', 'Bàn phím màu xanh - size L', 120.00, 100, NULL, '2023-10-18 13:05:23', '2023-10-18 13:05:24', '231018', '018');
	
INSERT INTO `tmt093_productsizes` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'S', '2023-10-18 12:52:29', '2023-10-18 12:52:30'),
	(2, 'L', '2023-10-18 12:52:43', '2023-10-18 12:52:44');

INSERT INTO `tmt094_productcolors` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'while', '2023-10-18 12:53:02', '2023-10-18 12:53:03'),
	(2, 'blue', '2023-10-18 12:53:15', '2023-10-18 12:53:16');


INSERT INTO `VariationColor` (`createdAt`, `updatedAt`, `variation_id`, `color_id`) VALUES
	('2023-10-18 13:05:52', '2023-10-18 13:05:53', 1, 1),
	('2023-10-18 13:06:42', '2023-10-18 13:06:43', 2, 2),
	('2023-10-18 13:07:59', '2023-10-18 13:07:59', 3, 1),
	('2023-10-18 13:08:18', '2023-10-18 13:08:18', 4, 2);
	
INSERT INTO `VariationSize` (`createdAt`, `updatedAt`, `variation_id`, `size_id`) VALUES
	('2023-10-18 13:08:41', '2023-10-18 13:08:42', 1, 1),
	('2023-10-18 13:08:57', '2023-10-18 13:08:58', 2, 2),
	('2023-10-18 13:09:09', '2023-10-18 13:09:09', 3, 1),
	('2023-10-18 13:09:19', '2023-10-18 13:09:19', 4, 2);