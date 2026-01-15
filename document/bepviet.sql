-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2026 at 08:09 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bepviet`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `type` enum('region','dish_type','diet') DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Danh mục dùng để lọc món ăn';

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `type`, `image_url`) VALUES
(1, 'Miền Bắc', 'mien-bac', 'region', 'url_bac'),
(2, 'Miền Trung', 'mien-trung', 'region', 'url_trung'),
(3, 'Miền Nam', 'mien-nam', 'region', 'url_nam'),
(4, 'Món Kho', 'mon-kho', 'dish_type', 'url_kho'),
(5, 'Món Canh', 'mon-canh', 'dish_type', 'url_canh'),
(6, 'Món Xào', 'mon-xao', 'dish_type', 'url_xao'),
(7, 'Món Chiên', 'mon-chien', 'dish_type', 'url_chien'),
(8, 'Món Nướng', 'mon-nuong', 'dish_type', 'url_nuong'),
(9, 'Eat Clean', 'eat-clean', 'diet', 'url_eatclean'),
(10, 'Keto', 'keto', 'diet', 'url_keto'),
(11, 'Ăn Chay', 'an-chay', 'diet', 'url_chay'),
(12, 'Ăn Dặm', 'an-dam', 'diet', 'url_andam'),
(13, 'Món Nhậu', 'mon-nhau', 'dish_type', 'url_nhau'),
(14, 'Điểm Tâm', 'diem-tam', 'dish_type', 'url_diemtam'),
(15, 'Tráng Miệng', 'trang-mieng', 'dish_type', 'url_trangmieng'),
(16, 'Sinh Tố', 'sinh-to', 'dish_type', 'url_sinhto'),
(17, 'Món Lẩu', 'mon-lau', 'dish_type', 'url_lau'),
(18, 'Món Gỏi', 'mon-goi', 'dish_type', 'url_goi'),
(19, 'Đồ Uống', 'do-uong', 'dish_type', 'url_douong'),
(20, 'Bánh Ngọt', 'banh-ngot', 'dish_type', 'url_banhngot'),
(21, 'Danh mục 21', 'dm-21', 'dish_type', NULL),
(22, 'Danh mục 22', 'dm-22', 'dish_type', NULL),
(23, 'Danh mục 23', 'dm-23', 'dish_type', NULL),
(24, 'Danh mục 24', 'dm-24', 'dish_type', NULL),
(25, 'Danh mục 25', 'dm-25', 'dish_type', NULL),
(26, 'Danh mục 26', 'dm-26', 'dish_type', NULL),
(27, 'Danh mục 27', 'dm-27', 'dish_type', NULL),
(28, 'Danh mục 28', 'dm-28', 'dish_type', NULL),
(29, 'Danh mục 29', 'dm-29', 'dish_type', NULL),
(30, 'Danh mục 30', 'dm-30', 'dish_type', NULL),
(31, 'Danh mục 31', 'dm-31', 'dish_type', NULL),
(32, 'Danh mục 32', 'dm-32', 'dish_type', NULL),
(33, 'Danh mục 33', 'dm-33', 'dish_type', NULL),
(34, 'Danh mục 34', 'dm-34', 'dish_type', NULL),
(35, 'Danh mục 35', 'dm-35', 'dish_type', NULL),
(36, 'Danh mục 36', 'dm-36', 'dish_type', NULL),
(37, 'Danh mục 37', 'dm-37', 'dish_type', NULL),
(38, 'Danh mục 38', 'dm-38', 'dish_type', NULL),
(39, 'Danh mục 39', 'dm-39', 'dish_type', NULL),
(40, 'Danh mục 40', 'dm-40', 'dish_type', NULL),
(41, 'Danh mục 41', 'dm-41', 'dish_type', NULL),
(42, 'Danh mục 42', 'dm-42', 'dish_type', NULL),
(43, 'Danh mục 43', 'dm-43', 'dish_type', NULL),
(44, 'Danh mục 44', 'dm-44', 'dish_type', NULL),
(45, 'Danh mục 45', 'dm-45', 'dish_type', NULL),
(46, 'Danh mục 46', 'dm-46', 'dish_type', NULL),
(47, 'Danh mục 47', 'dm-47', 'dish_type', NULL),
(48, 'Danh mục 48', 'dm-48', 'dish_type', NULL),
(49, 'Danh mục 49', 'dm-49', 'dish_type', NULL),
(50, 'Danh mục 50', 'dm-50', 'dish_type', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `category_recipe`
--

CREATE TABLE `category_recipe` (
  `recipe_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category_recipe`
--

INSERT INTO `category_recipe` (`recipe_id`, `category_id`) VALUES
(1, 1),
(1, 5),
(2, 1),
(2, 4),
(3, 9),
(3, 14),
(4, 9),
(5, 7),
(6, 3),
(6, 5),
(7, 3),
(7, 4),
(8, 16),
(8, 19),
(9, 3),
(9, 14),
(10, 6),
(11, 1),
(12, 2),
(13, 3),
(14, 4),
(15, 5),
(16, 6),
(17, 7),
(18, 8),
(19, 9),
(20, 10),
(21, 11),
(22, 12),
(23, 13),
(24, 14),
(25, 15),
(26, 16),
(27, 17),
(28, 18),
(29, 19),
(30, 20),
(31, 1),
(32, 2),
(33, 3),
(34, 4),
(35, 5),
(36, 6),
(37, 7),
(38, 8),
(39, 9),
(40, 10),
(41, 11),
(42, 12),
(43, 13),
(44, 14),
(45, 15),
(46, 16),
(47, 17),
(48, 18),
(49, 19),
(50, 20);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `recipe_id` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL COMMENT 'Để trả lời comment (Reply)',
  `content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `recipe_id`, `parent_id`, `content`, `created_at`) VALUES
(1, 3, 1, NULL, 'Món này ngon quá chị ơi!', '2026-01-08 15:35:48'),
(2, 4, 1, NULL, 'Nhìn hấp dẫn quá, mai em sẽ thử.', '2026-01-08 15:35:48'),
(3, 2, 3, NULL, 'Healthy mà ngon ghê.', '2026-01-08 15:35:48'),
(4, 5, 2, NULL, 'Sườn mềm, đậm đà lắm.', '2026-01-08 15:35:48'),
(5, 6, 4, NULL, 'Gạo lứt hơi khô nhưng ăn quen thấy ngon.', '2026-01-08 15:35:48'),
(6, 7, 5, NULL, 'Bò mềm tan trong miệng.', '2026-01-08 15:35:48'),
(7, 8, 6, NULL, 'Canh chua chuẩn vị miền Tây luôn.', '2026-01-08 15:35:48'),
(8, 9, 7, NULL, 'Thịt kho tàu ngày Tết là nhất.', '2026-01-08 15:35:48'),
(9, 10, 8, NULL, 'Sinh tố béo ngậy.', '2026-01-08 15:35:48'),
(10, 11, 9, NULL, 'Bánh mì giòn rụm.', '2026-01-08 15:35:48'),
(11, 12, 10, NULL, 'Ngon!', '2026-01-08 15:35:48'),
(12, 13, 11, NULL, 'Tuyệt vời.', '2026-01-08 15:35:48'),
(13, 14, 12, NULL, '10 điểm.', '2026-01-08 15:35:48'),
(14, 15, 13, NULL, 'Quá đã.', '2026-01-08 15:35:48'),
(15, 16, 14, NULL, 'Yummy.', '2026-01-08 15:35:48'),
(16, 17, 15, NULL, 'Thích món này.', '2026-01-08 15:35:48'),
(17, 18, 16, NULL, 'Dễ làm lắm.', '2026-01-08 15:35:48'),
(18, 19, 17, NULL, 'Cảm ơn chủ thớt.', '2026-01-08 15:35:48'),
(19, 20, 18, NULL, 'Good job.', '2026-01-08 15:35:48'),
(20, 21, 19, NULL, 'Món tủ của mình.', '2026-01-08 15:35:48'),
(21, 22, 20, NULL, 'Ăn hoài không chán.', '2026-01-08 15:35:48'),
(22, 23, 21, NULL, 'Đỉnh cao.', '2026-01-08 15:35:48'),
(23, 24, 22, NULL, 'Xuất sắc.', '2026-01-08 15:35:48'),
(24, 25, 23, NULL, 'Sẽ nấu lại.', '2026-01-08 15:35:48'),
(25, 26, 24, NULL, 'Chồng khen ngon.', '2026-01-08 15:35:48'),
(26, 27, 25, NULL, 'Bé nhà mình thích lắm.', '2026-01-08 15:35:48'),
(27, 28, 26, NULL, 'Hơi cay xíu.', '2026-01-08 15:35:48'),
(28, 29, 27, NULL, 'Vừa miệng.', '2026-01-08 15:35:48'),
(29, 30, 28, NULL, 'Rất bổ dưỡng.', '2026-01-08 15:35:48'),
(30, 31, 29, NULL, 'Đơn giản dễ làm.', '2026-01-08 15:35:48'),
(31, 32, 30, NULL, 'Nhanh gọn lẹ.', '2026-01-08 15:35:48'),
(32, 33, 31, NULL, 'Hương vị tuyệt vời.', '2026-01-08 15:35:48'),
(33, 34, 32, NULL, 'Màu sắc đẹp.', '2026-01-08 15:35:48'),
(34, 35, 33, NULL, 'Rất sáng tạo.', '2026-01-08 15:35:48'),
(35, 36, 34, NULL, 'Đáng để thử.', '2026-01-08 15:35:48'),
(36, 37, 35, NULL, 'Ngon hơn ngoài hàng.', '2026-01-08 15:35:48'),
(37, 38, 36, NULL, 'Chuẩn cơm mẹ nấu.', '2026-01-08 15:35:48'),
(38, 39, 37, NULL, 'Tuyệt cú mèo.', '2026-01-08 15:35:48'),
(39, 40, 38, NULL, 'Món này hao cơm lắm.', '2026-01-08 15:35:48'),
(40, 41, 39, NULL, 'Đậm đà.', '2026-01-08 15:35:48'),
(41, 42, 40, NULL, 'Thơm phức.', '2026-01-08 15:35:48'),
(42, 43, 41, NULL, 'Ngon nhức nách.', '2026-01-08 15:35:48'),
(43, 44, 42, NULL, 'Quá xá đã.', '2026-01-08 15:35:48'),
(44, 45, 43, NULL, 'Hấp dẫn.', '2026-01-08 15:35:48'),
(45, 46, 44, NULL, 'Nhìn là thèm.', '2026-01-08 15:35:48'),
(46, 47, 45, NULL, 'Ăn một lần nhớ mãi.', '2026-01-08 15:35:48'),
(47, 48, 46, NULL, 'Vote 5 sao.', '2026-01-08 15:35:48'),
(48, 49, 47, NULL, 'Thêm ớt xíu nữa là ngon.', '2026-01-08 15:35:48'),
(49, 50, 48, NULL, 'Rất healthy.', '2026-01-08 15:35:48');

-- --------------------------------------------------------

--
-- Table structure for table `cookbooks`
--

CREATE TABLE `cookbooks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL COMMENT 'VD: Món ngon ngày tết',
  `is_public` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cookbooks`
--

INSERT INTO `cookbooks` (`id`, `user_id`, `title`, `is_public`, `created_at`) VALUES
(1, 2, 'Món Ngon Ngày Tết', 1, '2026-01-08 15:35:48'),
(2, 2, 'Thực đơn ăn dặm', 1, '2026-01-08 15:35:48'),
(3, 3, 'Eat Clean 7 ngày', 1, '2026-01-08 15:35:48'),
(4, 3, 'Sinh tố đẹp da', 1, '2026-01-08 15:35:48'),
(5, 4, 'Món Nhậu Cuối Tuần', 0, '2026-01-08 15:35:48'),
(6, 5, 'Bánh Ngọt Tại Nhà', 1, '2026-01-08 15:35:48'),
(7, 6, 'Món Chay', 1, '2026-01-08 15:35:48'),
(8, 7, 'Món Kho', 1, '2026-01-08 15:35:48'),
(9, 8, 'Món Canh', 1, '2026-01-08 15:35:48'),
(10, 9, 'Món Xào', 1, '2026-01-08 15:35:48'),
(11, 10, 'Món Chiên', 1, '2026-01-08 15:35:48'),
(12, 11, 'Món Nướng', 1, '2026-01-08 15:35:48'),
(13, 12, 'Món Hấp', 1, '2026-01-08 15:35:48'),
(14, 13, 'Món Luộc', 1, '2026-01-08 15:35:48'),
(15, 14, 'Món Gỏi', 1, '2026-01-08 15:35:48'),
(16, 15, 'Món Lẩu', 1, '2026-01-08 15:35:48'),
(17, 16, 'Món Cuốn', 1, '2026-01-08 15:35:48'),
(18, 17, 'Món Trộn', 1, '2026-01-08 15:35:48'),
(19, 18, 'Món Hầm', 1, '2026-01-08 15:35:48'),
(20, 19, 'Món Tiềm', 1, '2026-01-08 15:35:48'),
(21, 20, 'Món Rang', 1, '2026-01-08 15:35:48'),
(22, 21, 'Món Rim', 1, '2026-01-08 15:35:48'),
(23, 22, 'Món Sốt', 1, '2026-01-08 15:35:48'),
(24, 23, 'Món Om', 1, '2026-01-08 15:35:48'),
(25, 24, 'Món Nộm', 1, '2026-01-08 15:35:48'),
(26, 25, 'Món Muối', 1, '2026-01-08 15:35:48'),
(27, 26, 'Món Chua', 1, '2026-01-08 15:35:48'),
(28, 27, 'Món Cay', 1, '2026-01-08 15:35:48'),
(29, 28, 'Món Ngọt', 1, '2026-01-08 15:35:48'),
(30, 29, 'Món Mặn', 1, '2026-01-08 15:35:48'),
(31, 30, 'Món Nhạt', 1, '2026-01-08 15:35:48'),
(32, 31, 'Món Lạ', 1, '2026-01-08 15:35:48'),
(33, 32, 'Món Quen', 1, '2026-01-08 15:35:48'),
(34, 33, 'Món Mới', 1, '2026-01-08 15:35:48'),
(35, 34, 'Món Cũ', 1, '2026-01-08 15:35:48'),
(36, 35, 'Món Nhanh', 1, '2026-01-08 15:35:48'),
(37, 36, 'Món Chậm', 1, '2026-01-08 15:35:48'),
(38, 37, 'Món Dễ', 1, '2026-01-08 15:35:48'),
(39, 38, 'Món Khó', 1, '2026-01-08 15:35:48'),
(40, 39, 'Món Vừa', 1, '2026-01-08 15:35:48'),
(41, 40, 'Món Đắt', 1, '2026-01-08 15:35:48'),
(42, 41, 'Món Rẻ', 1, '2026-01-08 15:35:48'),
(43, 42, 'Món Sang', 1, '2026-01-08 15:35:48'),
(44, 43, 'Món Bình Dân', 1, '2026-01-08 15:35:48'),
(45, 44, 'Món Vỉa Hè', 1, '2026-01-08 15:35:48'),
(46, 45, 'Món Nhà Hàng', 1, '2026-01-08 15:35:48'),
(47, 46, 'Món Tây', 1, '2026-01-08 15:35:48'),
(48, 47, 'Món Ta', 1, '2026-01-08 15:35:48'),
(49, 48, 'Món Tàu', 1, '2026-01-08 15:35:48'),
(50, 49, 'Món Thái', 1, '2026-01-08 15:35:48');

-- --------------------------------------------------------

--
-- Table structure for table `cookbook_recipes`
--

CREATE TABLE `cookbook_recipes` (
  `cookbook_id` int(11) DEFAULT NULL,
  `recipe_id` int(11) DEFAULT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Lưu món ăn vào bộ sưu tập';

--
-- Dumping data for table `cookbook_recipes`
--

INSERT INTO `cookbook_recipes` (`cookbook_id`, `recipe_id`, `added_at`) VALUES
(1, 7, '2026-01-08 15:42:07'),
(1, 6, '2026-01-08 15:42:07'),
(1, 2, '2026-01-08 15:42:07'),
(3, 3, '2026-01-08 15:42:07'),
(3, 4, '2026-01-08 15:42:07'),
(3, 8, '2026-01-08 15:42:07'),
(6, 15, '2026-01-08 15:42:07'),
(6, 20, '2026-01-08 15:42:07'),
(7, 10, '2026-01-08 15:42:07'),
(8, 11, '2026-01-08 15:42:07'),
(9, 12, '2026-01-08 15:42:07'),
(10, 13, '2026-01-08 15:42:07'),
(11, 14, '2026-01-08 15:42:07'),
(12, 15, '2026-01-08 15:42:07'),
(13, 16, '2026-01-08 15:42:07'),
(14, 17, '2026-01-08 15:42:07'),
(15, 18, '2026-01-08 15:42:07'),
(16, 19, '2026-01-08 15:42:07'),
(17, 20, '2026-01-08 15:42:07'),
(18, 21, '2026-01-08 15:42:07'),
(19, 22, '2026-01-08 15:42:07'),
(20, 23, '2026-01-08 15:42:07'),
(21, 24, '2026-01-08 15:42:07'),
(22, 25, '2026-01-08 15:42:07');

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT 'Tên nguyên liệu: Thịt gà, Trứng...',
  `type` varchar(255) DEFAULT NULL COMMENT 'Loại: Thịt, Rau, Gia vị...'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Dùng cho chức năng AI Gợi ý món ăn';

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`id`, `name`, `type`) VALUES
(1, 'Thịt gà', 'Thịt'),
(2, 'Thịt bò', 'Thịt'),
(3, 'Thịt heo', 'Thịt'),
(4, 'Cá lóc', 'Hải sản'),
(5, 'Tôm sú', 'Hải sản'),
(6, 'Mực', 'Hải sản'),
(7, 'Trứng gà', 'Trứng'),
(8, 'Đậu hũ', 'Đậu'),
(9, 'Nấm hương', 'Nấm'),
(10, 'Cà chua', 'Rau củ'),
(11, 'Khoai tây', 'Rau củ'),
(12, 'Cà rốt', 'Rau củ'),
(13, 'Rau muống', 'Rau lá'),
(14, 'Rau cải', 'Rau lá'),
(15, 'Hành tây', 'Rau củ'),
(16, 'Tỏi', 'Gia vị'),
(17, 'Hành tím', 'Gia vị'),
(18, 'Gừng', 'Gia vị'),
(19, 'Sả', 'Gia vị'),
(20, 'Ớt', 'Gia vị'),
(21, 'Tiêu', 'Gia vị'),
(22, 'Nước mắm', 'Gia vị'),
(23, 'Muối', 'Gia vị'),
(24, 'Đường', 'Gia vị'),
(25, 'Hạt nêm', 'Gia vị'),
(26, 'Dầu ăn', 'Gia vị'),
(27, 'Bột ngọt', 'Gia vị'),
(28, 'Ngũ vị hương', 'Gia vị'),
(29, 'Sữa tươi', 'Sữa'),
(30, 'Phô mai', 'Sữa'),
(31, 'Bún', 'Tinh bột'),
(32, 'Phở', 'Tinh bột'),
(33, 'Miến', 'Tinh bột'),
(34, 'Gạo', 'Tinh bột'),
(35, 'Bánh mì', 'Tinh bột'),
(36, 'Xương ống', 'Thịt'),
(37, 'Sườn non', 'Thịt'),
(38, 'Ba chỉ', 'Thịt'),
(39, 'Nghêu', 'Hải sản'),
(40, 'Cua', 'Hải sản'),
(41, 'Chanh', 'Trái cây'),
(42, 'Me', 'Trái cây'),
(43, 'Thơm (Dứa)', 'Trái cây'),
(44, 'Nước cốt dừa', 'Khác'),
(45, 'Bột năng', 'Khác'),
(46, 'Bột chiên giòn', 'Khác'),
(47, 'Dầu hào', 'Gia vị'),
(48, 'Nước tương', 'Gia vị'),
(49, 'Mắm tôm', 'Gia vị'),
(50, 'Mẻ', 'Gia vị');

-- --------------------------------------------------------

--
-- Table structure for table `interactions`
--

CREATE TABLE `interactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `recipe_id` int(11) DEFAULT NULL,
  `type` enum('like','rate') DEFAULT NULL,
  `rating_val` int(11) DEFAULT NULL COMMENT '1-5 sao (nếu type là rate)',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Lưu Like và Rating';

--
-- Dumping data for table `interactions`
--

INSERT INTO `interactions` (`id`, `user_id`, `recipe_id`, `type`, `rating_val`, `created_at`) VALUES
(1, 3, 1, 'like', NULL, '2026-01-08 15:35:48'),
(2, 4, 1, 'rate', 5, '2026-01-08 15:35:48'),
(3, 5, 2, 'like', NULL, '2026-01-08 15:35:48'),
(4, 6, 2, 'rate', 4, '2026-01-08 15:35:48'),
(5, 7, 3, 'like', NULL, '2026-01-08 15:35:48'),
(6, 8, 3, 'rate', 5, '2026-01-08 15:35:48'),
(7, 9, 4, 'like', NULL, '2026-01-08 15:35:48'),
(8, 10, 4, 'rate', 3, '2026-01-08 15:35:48'),
(9, 11, 5, 'like', NULL, '2026-01-08 15:35:48'),
(10, 12, 5, 'rate', 5, '2026-01-08 15:35:48'),
(11, 13, 6, 'like', NULL, '2026-01-08 15:35:48'),
(12, 14, 6, 'rate', 4, '2026-01-08 15:35:48'),
(13, 15, 7, 'like', NULL, '2026-01-08 15:35:48'),
(14, 16, 7, 'rate', 5, '2026-01-08 15:35:48'),
(15, 17, 8, 'like', NULL, '2026-01-08 15:35:48'),
(16, 18, 8, 'rate', 4, '2026-01-08 15:35:48'),
(17, 19, 9, 'like', NULL, '2026-01-08 15:35:48'),
(18, 20, 9, 'rate', 5, '2026-01-08 15:35:48'),
(19, 21, 10, 'like', NULL, '2026-01-08 15:35:48'),
(20, 22, 10, 'rate', 3, '2026-01-08 15:35:48'),
(21, 23, 11, 'like', NULL, '2026-01-08 15:35:48'),
(22, 24, 11, 'rate', 4, '2026-01-08 15:35:48'),
(23, 25, 12, 'like', NULL, '2026-01-08 15:35:48'),
(24, 26, 12, 'rate', 5, '2026-01-08 15:35:48'),
(25, 27, 13, 'like', NULL, '2026-01-08 15:35:48'),
(26, 28, 13, 'rate', 4, '2026-01-08 15:35:48'),
(27, 29, 14, 'like', NULL, '2026-01-08 15:35:48'),
(28, 30, 14, 'rate', 5, '2026-01-08 15:35:48'),
(29, 31, 15, 'like', NULL, '2026-01-08 15:35:48'),
(30, 32, 15, 'rate', 3, '2026-01-08 15:35:48'),
(31, 33, 16, 'like', NULL, '2026-01-08 15:35:48'),
(32, 34, 16, 'rate', 4, '2026-01-08 15:35:48'),
(33, 35, 17, 'like', NULL, '2026-01-08 15:35:48'),
(34, 36, 17, 'rate', 5, '2026-01-08 15:35:48'),
(35, 37, 18, 'like', NULL, '2026-01-08 15:35:48'),
(36, 38, 18, 'rate', 4, '2026-01-08 15:35:48'),
(37, 39, 19, 'like', NULL, '2026-01-08 15:35:48'),
(38, 40, 19, 'rate', 5, '2026-01-08 15:35:48'),
(39, 41, 20, 'like', NULL, '2026-01-08 15:35:48'),
(40, 42, 20, 'rate', 3, '2026-01-08 15:35:48'),
(41, 43, 21, 'like', NULL, '2026-01-08 15:35:48'),
(42, 44, 21, 'rate', 4, '2026-01-08 15:35:48'),
(43, 45, 22, 'like', NULL, '2026-01-08 15:35:48'),
(44, 46, 22, 'rate', 5, '2026-01-08 15:35:48'),
(45, 47, 23, 'like', NULL, '2026-01-08 15:35:48'),
(46, 48, 23, 'rate', 4, '2026-01-08 15:35:48'),
(47, 49, 24, 'like', NULL, '2026-01-08 15:35:48'),
(48, 50, 24, 'rate', 5, '2026-01-08 15:35:48');

-- --------------------------------------------------------

--
-- Table structure for table `meal_plans`
--

CREATE TABLE `meal_plans` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `recipe_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `meal_type` varchar(255) DEFAULT NULL COMMENT 'Sáng, Trưa, Tối'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meal_plans`
--

INSERT INTO `meal_plans` (`id`, `user_id`, `recipe_id`, `date`, `meal_type`) VALUES
(1, 2, 9, '2026-01-08', 'Sáng'),
(2, 2, 3, '2026-01-08', 'Trưa'),
(3, 2, 6, '2026-01-08', 'Tối'),
(4, 2, 1, '2026-01-09', 'Sáng'),
(5, 2, 4, '2026-01-09', 'Trưa'),
(6, 2, 2, '2026-01-09', 'Tối'),
(7, 2, 10, '2026-01-10', 'Sáng'),
(8, 2, 7, '2026-01-10', 'Trưa'),
(9, 2, 5, '2026-01-10', 'Tối'),
(10, 3, 8, '2026-01-08', 'Sáng'),
(11, 3, 3, '2026-01-08', 'Trưa'),
(12, 3, 4, '2026-01-08', 'Tối');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='NoSQL Collection: Thông báo realtime';

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `type`, `message`, `link`, `read_at`, `created_at`) VALUES
(1, 2, 'like', 'Nguyễn Văn A đã thích bài viết Phở Bò của bạn.', '/recipe/pho-bo-tai-lan', NULL, '2026-01-08 15:42:07'),
(2, 2, 'comment', 'Trần Thị B đã bình luận vào bài viết Sườn Xào.', '/recipe/suon-xao', NULL, '2026-01-08 14:42:07'),
(3, 2, 'system', 'Chào mừng bạn đến với Bếp Việt 4.0!', '#', NULL, '2026-01-07 15:42:07'),
(4, 3, 'follow', 'Mẹ Bắp đã bắt đầu theo dõi bạn.', '/user/mebap', NULL, '2026-01-08 15:42:07'),
(5, 2, 'admin', 'Bài viết Bánh Mì Pate của bạn đã được duyệt.', '/recipe/banh-mi-pate', NULL, '2026-01-08 15:42:07'),
(6, 2, 'like', 'User C đã thích bài viết của bạn.', '#', NULL, '2026-01-08 15:42:07'),
(7, 2, 'like', 'User D đã thích bài viết của bạn.', '#', NULL, '2026-01-08 15:42:07'),
(8, 3, 'like', 'User E đã thích bài viết của bạn.', '#', NULL, '2026-01-08 15:42:07'),
(9, 4, 'system', 'Cập nhật chính sách mới.', '#', NULL, '2026-01-08 15:42:07'),
(10, 5, 'comment', 'Ai đó đã trả lời bình luận của bạn.', '#', NULL, '2026-01-08 15:42:07');

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `prep_time` int(11) DEFAULT NULL COMMENT 'Phút',
  `cook_time` int(11) DEFAULT NULL COMMENT 'Phút',
  `difficulty` enum('easy','medium','hard') DEFAULT NULL,
  `calories` int(11) DEFAULT NULL,
  `status` enum('draft','pending','approved','hidden','rejected') DEFAULT 'pending',
  `view_count` int(11) DEFAULT 0,
  `meta_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Cột JSON lưu dữ liệu phi cấu trúc: tags, màu sắc, dinh dưỡng chi tiết...' CHECK (json_valid(`meta_data`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Bảng quan trọng nhất. Chứa thông tin món ăn.';

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`id`, `user_id`, `title`, `slug`, `description`, `image_url`, `video_url`, `prep_time`, `cook_time`, `difficulty`, `calories`, `status`, `view_count`, `meta_data`, `created_at`, `updated_at`) VALUES
(1, 2, 'Phở Bò Tái Lăn', 'pho-bo-tai-lan', 'Món phở bò tái lăn chuẩn vị Hà Nội', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0', NULL, 30, 60, 'medium', 500, 'approved', 0, '{\"color\": \"brown\"}', '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(2, 2, 'Sườn Xào Chua Ngọt', 'suon-xao-chua-ngot', 'Sườn non chua ngọt đậm đà đưa cơm', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', NULL, 20, 40, 'easy', 600, 'approved', 0, '{\"color\": \"red\"}', '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(3, 3, 'Salad Ức Gà', 'salad-uc-ga', 'Món ăn giảm cân healthy', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', NULL, 15, 15, 'easy', 300, 'approved', 0, '{\"color\": \"green\"}', '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(4, 3, 'Cơm Gạo Lứt', 'com-gao-lut', 'Cơm gạo lứt ăn kèm rau củ', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', NULL, 10, 30, 'easy', 400, 'approved', 0, '{\"color\": \"brown\"}', '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(5, 4, 'Bò Bít Tết', 'bo-bit-tet', 'Bò bít tết sốt tiêu đen', 'https://images.unsplash.com/photo-1600891964092-4316c288032e', NULL, 20, 20, 'medium', 700, 'approved', 0, '{\"color\": \"dark\"}', '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(6, 2, 'Canh Chua Cá Lóc', 'canh-chua-ca-loc', 'Đậm đà hương vị miền Tây', 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe', NULL, 20, 30, 'medium', 450, 'approved', 0, '{\"color\": \"yellow\"}', '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(7, 2, 'Thịt Kho Tàu', 'thit-kho-tau', 'Món ăn không thể thiếu ngày Tết', 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8', NULL, 30, 60, 'medium', 800, 'approved', 0, '{\"color\": \"brown\"}', '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(8, 3, 'Sinh Tố Bơ', 'sinh-to-bo', 'Béo ngậy, bổ dưỡng', 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8', NULL, 10, 5, 'easy', 250, 'approved', 0, '{\"color\": \"green\"}', '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(9, 5, 'Bánh Mì Pate', 'banh-mi-pate', 'Bánh mì Việt Nam giòn rụm', 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8', NULL, 10, 5, 'easy', 400, 'pending', 0, '{\"color\": \"orange\"}', '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(10, 5, 'Mì Gói Xào Bò', 'mi-goi-xao-bo', 'Bữa sáng nhanh gọn', 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8', NULL, 5, 10, 'easy', 500, 'draft', 0, '{\"color\": \"yellow\"}', '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(11, 6, 'Món Ngon 11', 'mon-ngon-11', NULL, NULL, NULL, 15, 30, 'easy', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(12, 7, 'Món Ngon 12', 'mon-ngon-12', NULL, NULL, NULL, 20, 40, 'medium', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(13, 8, 'Món Ngon 13', 'mon-ngon-13', NULL, NULL, NULL, 25, 50, 'hard', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(14, 9, 'Món Ngon 14', 'mon-ngon-14', NULL, NULL, NULL, 10, 20, 'easy', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(15, 10, 'Món Ngon 15', 'mon-ngon-15', NULL, NULL, NULL, 30, 60, 'medium', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(16, 11, 'Món Ngon 16', 'mon-ngon-16', NULL, NULL, NULL, 15, 30, 'easy', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(17, 12, 'Món Ngon 17', 'mon-ngon-17', NULL, NULL, NULL, 20, 40, 'medium', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(18, 13, 'Món Ngon 18', 'mon-ngon-18', NULL, NULL, NULL, 25, 50, 'hard', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(19, 14, 'Món Ngon 19', 'mon-ngon-19', NULL, NULL, NULL, 10, 20, 'easy', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(20, 15, 'Món Ngon 20', 'mon-ngon-20', NULL, NULL, NULL, 30, 60, 'medium', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(21, 16, 'Món Ngon 21', 'mon-ngon-21', NULL, NULL, NULL, 15, 30, 'easy', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(22, 17, 'Món Ngon 22', 'mon-ngon-22', NULL, NULL, NULL, 20, 40, 'medium', NULL, 'pending', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(23, 18, 'Món Ngon 23', 'mon-ngon-23', NULL, NULL, NULL, 25, 50, 'hard', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(24, 19, 'Món Ngon 24', 'mon-ngon-24', NULL, NULL, NULL, 10, 20, 'easy', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(25, 20, 'Món Ngon 25', 'mon-ngon-25', NULL, NULL, NULL, 30, 60, 'medium', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(26, 21, 'Món Ngon 26', 'mon-ngon-26', NULL, NULL, NULL, 15, 30, 'easy', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(27, 22, 'Món Ngon 27', 'mon-ngon-27', NULL, NULL, NULL, 20, 40, 'medium', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(28, 23, 'Món Ngon 28', 'mon-ngon-28', NULL, NULL, NULL, 25, 50, 'hard', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(29, 24, 'Món Ngon 29', 'mon-ngon-29', NULL, NULL, NULL, 10, 20, 'easy', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(30, 25, 'Món Ngon 30', 'mon-ngon-30', NULL, NULL, NULL, 30, 60, 'medium', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(31, 26, 'Món Ngon 31', 'mon-ngon-31', NULL, NULL, NULL, 15, 30, 'easy', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(32, 27, 'Món Ngon 32', 'mon-ngon-32', NULL, NULL, NULL, 20, 40, 'medium', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(33, 28, 'Món Ngon 33', 'mon-ngon-33', NULL, NULL, NULL, 25, 50, 'hard', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(34, 29, 'Món Ngon 34', 'mon-ngon-34', NULL, NULL, NULL, 10, 20, 'easy', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(35, 30, 'Món Ngon 35', 'mon-ngon-35', NULL, NULL, NULL, 30, 60, 'medium', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(36, 31, 'Món Ngon 36', 'mon-ngon-36', NULL, NULL, NULL, 15, 30, 'easy', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(37, 32, 'Món Ngon 37', 'mon-ngon-37', NULL, NULL, NULL, 20, 40, 'medium', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(38, 33, 'Món Ngon 38', 'mon-ngon-38', NULL, NULL, NULL, 25, 50, 'hard', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(39, 34, 'Món Ngon 39', 'mon-ngon-39', NULL, NULL, NULL, 10, 20, 'easy', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(40, 35, 'Món Ngon 40', 'mon-ngon-40', NULL, NULL, NULL, 30, 60, 'medium', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(41, 36, 'Món Ngon 41', 'mon-ngon-41', NULL, NULL, NULL, 15, 30, 'easy', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(42, 37, 'Món Ngon 42', 'mon-ngon-42', NULL, NULL, NULL, 20, 40, 'medium', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(43, 38, 'Món Ngon 43', 'mon-ngon-43', NULL, NULL, NULL, 25, 50, 'hard', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(44, 39, 'Món Ngon 44', 'mon-ngon-44', NULL, NULL, NULL, 10, 20, 'easy', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(45, 40, 'Món Ngon 45', 'mon-ngon-45', NULL, NULL, NULL, 30, 60, 'medium', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(46, 41, 'Món Ngon 46', 'mon-ngon-46', NULL, NULL, NULL, 15, 30, 'easy', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(47, 42, 'Món Ngon 47', 'mon-ngon-47', NULL, NULL, NULL, 20, 40, 'medium', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(48, 43, 'Món Ngon 48', 'mon-ngon-48', NULL, NULL, NULL, 25, 50, 'hard', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(49, 44, 'Món Ngon 49', 'mon-ngon-49', NULL, NULL, NULL, 10, 20, 'easy', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(50, 45, 'Món Ngon 50', 'mon-ngon-50', NULL, NULL, NULL, 30, 60, 'medium', NULL, 'approved', 0, NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_ingredients`
--

CREATE TABLE `recipe_ingredients` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) DEFAULT NULL,
  `ingredient_id` int(11) DEFAULT NULL,
  `quantity` varchar(255) DEFAULT NULL COMMENT 'VD: 500g, 2 quả',
  `note` varchar(255) DEFAULT NULL COMMENT 'VD: thái hạt lựu'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipe_ingredients`
--

INSERT INTO `recipe_ingredients` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `note`) VALUES
(1, 1, 2, '300g', 'Thịt bò tái'),
(2, 1, 32, '500g', 'Bánh phở'),
(3, 1, 16, '3 tép', 'Tỏi đập dập'),
(4, 2, 37, '500g', 'Sườn non'),
(5, 2, 10, '2 quả', 'Cà chua'),
(6, 2, 23, '1 thìa', 'Nước mắm'),
(7, 3, 1, '200g', 'Ức gà'),
(8, 3, 13, '100g', 'Xà lách'),
(9, 3, 10, '1 quả', 'Cà chua'),
(10, 4, 34, '1 chén', 'Gạo lứt'),
(11, 4, 12, '1 củ', 'Cà rốt'),
(12, 4, 7, '1 quả', 'Trứng'),
(13, 5, 2, '200g', 'Thăn bò'),
(14, 5, 11, '1 củ', 'Khoai tây chiên'),
(15, 5, 21, '1 thìa', 'Tiêu đen'),
(16, 6, 4, '1 con', 'Cá lóc đồng'),
(17, 6, 42, '1/4 quả', 'Thơm'),
(18, 6, 41, '1 vắt', 'Me chua'),
(19, 7, 38, '500g', 'Ba chỉ'),
(20, 7, 7, '5 quả', 'Trứng vịt'),
(21, 7, 43, '1 chén', 'Nước dừa'),
(22, 8, 44, '1 quả', 'Bơ sáp'),
(23, 8, 29, '100ml', 'Sữa tươi'),
(24, 8, 30, '1 thìa', 'Sữa đặc'),
(25, 9, 35, '1 ổ', 'Bánh mì'),
(26, 9, 3, '50g', 'Pate gan'),
(27, 9, 14, 'vài cọng', 'Ngò rí'),
(28, 10, 31, '1 gói', 'Mì Hảo Hảo'),
(29, 10, 2, '50g', 'Bò tái'),
(30, 10, 14, 'ít', 'Hành lá'),
(31, 11, 1, '100g', ''),
(32, 12, 2, '100g', ''),
(33, 13, 3, '100g', ''),
(34, 14, 4, '100g', ''),
(35, 15, 5, '100g', ''),
(36, 16, 6, '100g', ''),
(37, 17, 7, '100g', ''),
(38, 18, 8, '100g', ''),
(39, 19, 9, '100g', ''),
(40, 20, 10, '100g', ''),
(41, 21, 11, '100g', ''),
(42, 22, 12, '100g', ''),
(43, 23, 13, '100g', ''),
(44, 24, 14, '100g', ''),
(45, 25, 15, '100g', ''),
(46, 26, 16, '100g', ''),
(47, 27, 17, '100g', ''),
(48, 28, 18, '100g', ''),
(49, 29, 19, '100g', ''),
(50, 30, 20, '100g', ''),
(51, 31, 21, '100g', ''),
(52, 32, 22, '100g', ''),
(53, 33, 23, '100g', ''),
(54, 34, 24, '100g', ''),
(55, 35, 25, '100g', ''),
(56, 36, 26, '100g', ''),
(57, 37, 27, '100g', ''),
(58, 38, 28, '100g', ''),
(59, 39, 29, '100g', ''),
(60, 40, 30, '100g', '');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_steps`
--

CREATE TABLE `recipe_steps` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) DEFAULT NULL,
  `step_order` int(11) DEFAULT NULL COMMENT 'Thứ tự bước: 1, 2, 3...',
  `content` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipe_steps`
--

INSERT INTO `recipe_steps` (`id`, `recipe_id`, `step_order`, `content`, `image_url`) VALUES
(1, 1, 1, 'Xương ống rửa sạch, chần qua nước sôi rồi ninh lấy nước dùng trong 4-6 tiếng. Nướng hành tím, gừng, quế hồi thả vào nồi nước dùng cho thơm.', 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500'),
(2, 1, 2, 'Thịt bò thái mỏng, ướp với tỏi băm, gừng, gia vị. Phi thơm tỏi, cho thịt bò vào xào nhanh tay trên lửa lớn cho vừa chín tới (tái lăn).', 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500'),
(3, 1, 3, 'Chần bánh phở qua nước sôi, cho vào bát. Xếp thịt bò xào lên trên, rắc hành lá. Chan nước dùng đang sôi vào và thưởng thức.', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500'),
(4, 2, 1, 'Sườn non rửa sạch, chặt miếng vừa ăn. Luộc sơ sườn khoảng 5 phút rồi vớt ra để ráo. Ướp sườn với chút hạt nêm.', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500'),
(5, 2, 2, 'Pha nước sốt: 3 thìa giấm/chanh, 3 thìa đường, 3 thìa nước mắm, 4 thìa nước lọc, khuấy đều.', 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500'),
(6, 2, 3, 'Chiên sơ sườn cho vàng đều các mặt. Phi thơm hành tỏi, đổ bát nước sốt vào đun sôi, cho sườn vào đảo đều đến khi sốt sệt lại bám đều vào sườn.', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'),
(7, 3, 1, 'Ức gà luộc hoặc áp chảo chín, xé nhỏ hoặc thái miếng vuông.', NULL),
(8, 3, 2, 'Rau xà lách, cà chua bi, dưa leo rửa sạch, cắt miếng vừa ăn.', NULL),
(9, 3, 3, 'Trộn sốt mè rang hoặc dầu giấm. Đổ sốt vào rau và gà, trộn đều nhẹ tay.', NULL),
(10, 6, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(11, 7, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(12, 4, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(13, 8, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(14, 5, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(15, 9, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(16, 10, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(17, 11, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(18, 12, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(19, 13, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(20, 14, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(21, 15, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(22, 16, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(23, 17, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(24, 18, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(25, 19, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(26, 20, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(27, 21, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(28, 22, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(29, 23, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(30, 24, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(31, 25, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(32, 26, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(33, 27, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(34, 28, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(35, 29, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(36, 30, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(37, 31, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(38, 32, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(39, 33, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(40, 34, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(41, 35, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(42, 36, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(43, 37, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(44, 38, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(45, 39, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(46, 40, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(47, 41, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(48, 42, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(49, 43, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(50, 44, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(51, 45, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(52, 46, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(53, 47, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(54, 48, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(55, 49, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(56, 50, 1, 'Sơ chế sạch sẽ tất cả các nguyên liệu. Rửa sạch thịt/cá với nước muối loãng.', NULL),
(73, 6, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(74, 7, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(75, 4, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(76, 8, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(77, 5, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(78, 9, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(79, 10, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(80, 11, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(81, 12, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(82, 13, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(83, 14, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(84, 15, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(85, 16, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(86, 17, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(87, 18, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(88, 19, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(89, 20, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(90, 21, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(91, 22, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(92, 23, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(93, 24, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(94, 25, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(95, 26, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(96, 27, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(97, 28, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(98, 29, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(99, 30, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(100, 31, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(101, 32, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(102, 33, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(103, 34, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(104, 35, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(105, 36, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(106, 37, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(107, 38, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(108, 39, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(109, 40, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(110, 41, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(111, 42, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(112, 43, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(113, 44, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(114, 45, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(115, 46, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(116, 47, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(117, 48, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(118, 49, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(119, 50, 2, 'Tẩm ướp gia vị theo công thức trong khoảng 15-20 phút cho ngấm đều.', NULL),
(136, 6, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(137, 7, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(138, 4, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(139, 8, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(140, 5, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(141, 9, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(142, 10, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(143, 11, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(144, 12, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(145, 13, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(146, 14, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(147, 15, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(148, 16, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(149, 17, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(150, 18, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(151, 19, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(152, 20, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(153, 21, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(154, 22, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(155, 23, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(156, 24, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(157, 25, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(158, 26, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(159, 27, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(160, 28, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(161, 29, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(162, 30, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(163, 31, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(164, 32, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(165, 33, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(166, 34, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(167, 35, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(168, 36, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(169, 37, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(170, 38, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(171, 39, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(172, 40, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(173, 41, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(174, 42, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(175, 43, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(176, 44, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(177, 45, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(178, 46, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(179, 47, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(180, 48, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(181, 49, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(182, 50, 3, 'Tiến hành nấu (chiên/xào/nấu canh) trên lửa vừa. Nêm nếm lại cho vừa khẩu vị.', NULL),
(199, 6, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(200, 7, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(201, 4, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(202, 8, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(203, 5, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(204, 9, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(205, 10, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(206, 11, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(207, 12, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(208, 13, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(209, 14, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(210, 15, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(211, 16, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(212, 17, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(213, 18, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(214, 19, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(215, 20, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(216, 21, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(217, 22, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(218, 23, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(219, 24, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(220, 25, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(221, 26, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(222, 27, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(223, 28, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(224, 29, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(225, 30, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(226, 31, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(227, 32, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(228, 33, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(229, 34, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(230, 35, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(231, 36, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(232, 37, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(233, 38, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(234, 39, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(235, 40, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(236, 41, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(237, 42, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(238, 43, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(239, 44, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(240, 45, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(241, 46, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(242, 47, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(243, 48, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(244, 49, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL),
(245, 50, 4, 'Trình bày ra dĩa, trang trí thêm ngò rí hoặc tiêu cho đẹp mắt. Dùng nóng.', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `reporter_id` int(11) DEFAULT NULL COMMENT 'Người báo cáo',
  `target_id` int(11) DEFAULT NULL COMMENT 'ID của bài viết/comment',
  `target_type` varchar(255) DEFAULT NULL COMMENT 'recipe hoặc comment',
  `reason` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL COMMENT 'pending, resolved',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `reporter_id`, `target_id`, `target_type`, `reason`, `status`, `created_at`) VALUES
(1, 3, 10, 'recipe', 'Ảnh không liên quan', 'pending', '2026-01-08 15:35:48'),
(2, 4, 5, 'user', 'Spam bình luận', 'resolved', '2026-01-08 15:35:48'),
(3, 5, 2, 'comment', 'Ngôn từ thù địch', 'pending', '2026-01-08 15:35:48'),
(4, 6, 15, 'recipe', 'Sai công thức', 'pending', '2026-01-08 15:35:48'),
(5, 7, 20, 'recipe', 'Quảng cáo trá hình', 'pending', '2026-01-08 15:35:48'),
(6, 8, 21, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(7, 9, 22, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(8, 10, 23, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(9, 11, 24, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(10, 12, 25, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(11, 13, 26, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(12, 14, 27, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(13, 15, 28, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(14, 16, 29, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(15, 17, 30, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(16, 18, 31, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(17, 19, 32, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(18, 20, 33, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(19, 21, 34, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(20, 22, 35, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(21, 23, 36, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(22, 24, 37, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(23, 25, 38, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(24, 26, 39, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(25, 27, 40, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(26, 28, 41, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(27, 29, 42, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(28, 30, 43, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(29, 31, 44, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(30, 32, 45, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(31, 33, 46, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(32, 34, 47, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(33, 35, 48, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(34, 36, 49, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(35, 37, 50, 'recipe', 'Spam', 'pending', '2026-01-08 15:35:48'),
(36, 38, 1, 'comment', 'Spam', 'pending', '2026-01-08 15:35:48'),
(37, 39, 2, 'comment', 'Spam', 'pending', '2026-01-08 15:35:48'),
(38, 40, 3, 'comment', 'Spam', 'pending', '2026-01-08 15:35:48'),
(39, 41, 4, 'comment', 'Spam', 'pending', '2026-01-08 15:35:48'),
(40, 42, 5, 'comment', 'Spam', 'pending', '2026-01-08 15:35:48'),
(41, 43, 6, 'comment', 'Spam', 'pending', '2026-01-08 15:35:48'),
(42, 44, 7, 'comment', 'Spam', 'pending', '2026-01-08 15:35:48'),
(43, 45, 8, 'comment', 'Spam', 'pending', '2026-01-08 15:35:48'),
(44, 46, 9, 'comment', 'Spam', 'pending', '2026-01-08 15:35:48'),
(45, 47, 10, 'comment', 'Spam', 'pending', '2026-01-08 15:35:48'),
(46, 48, 11, 'comment', 'Spam', 'pending', '2026-01-08 15:35:48'),
(47, 49, 12, 'comment', 'Spam', 'pending', '2026-01-08 15:35:48'),
(48, 50, 13, 'comment', 'Spam', 'pending', '2026-01-08 15:35:48');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL COMMENT 'URL ảnh đại diện',
  `bio` text DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `status` enum('active','banned') DEFAULT 'active',
  `social_id` varchar(255) DEFAULT NULL COMMENT 'ID Google/Facebook',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Lưu thông tin Admin và User. Admin quản lý user dựa trên cột Status.';

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `phone`, `password`, `avatar`, `bio`, `role`, `status`, `social_id`, `created_at`, `updated_at`) VALUES
(1, 'Admin Super', '0900000000', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'https://ui-avatars.com/api/?name=Admin&background=ef4444&color=fff', 'Quản trị viên hệ thống', 'admin', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(2, 'Mẹ Bắp', '0912345678', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'https://i.pravatar.cc/150?img=1', 'Yêu bếp, nghiện nhà', 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(3, 'Bếp Của Lan', '0987654321', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'https://i.pravatar.cc/150?img=2', 'Chia sẻ công thức Eatclean', 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(4, 'Hùng MasterChef', '0901112222', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'https://i.pravatar.cc/150?img=3', 'Chuyên món Âu', 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(5, 'Spammer 123', '0999999999', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'https://i.pravatar.cc/150?img=4', 'Tài khoản vi phạm', 'user', 'banned', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(6, 'Nguyễn Văn A', '0900000001', 'password_hash', 'https://i.pravatar.cc/150?img=5', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(7, 'Trần Thị B', '0900000002', 'password_hash', 'https://i.pravatar.cc/150?img=6', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(8, 'Lê Văn C', '0900000003', 'password_hash', 'https://i.pravatar.cc/150?img=7', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(9, 'Phạm Thị D', '0900000004', 'password_hash', 'https://i.pravatar.cc/150?img=8', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(10, 'Hoàng Văn E', '0900000005', 'password_hash', 'https://i.pravatar.cc/150?img=9', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(11, 'User F', '0900000006', 'hash', 'https://i.pravatar.cc/150?img=10', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(12, 'User G', '0900000007', 'hash', 'https://i.pravatar.cc/150?img=11', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(13, 'User H', '0900000008', 'hash', 'https://i.pravatar.cc/150?img=12', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(14, 'User I', '0900000009', 'hash', 'https://i.pravatar.cc/150?img=13', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(15, 'User J', '0900000010', 'hash', 'https://i.pravatar.cc/150?img=14', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(16, 'User K', '0900000011', 'hash', 'https://i.pravatar.cc/150?img=15', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(17, 'User L', '0900000012', 'hash', 'https://i.pravatar.cc/150?img=16', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(18, 'User M', '0900000013', 'hash', 'https://i.pravatar.cc/150?img=17', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(19, 'User N', '0900000014', 'hash', 'https://i.pravatar.cc/150?img=18', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(20, 'User O', '0900000015', 'hash', 'https://i.pravatar.cc/150?img=19', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(21, 'User P', '0900000016', 'hash', 'https://i.pravatar.cc/150?img=20', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(22, 'User Q', '0900000017', 'hash', 'https://i.pravatar.cc/150?img=21', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(23, 'User R', '0900000018', 'hash', 'https://i.pravatar.cc/150?img=22', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(24, 'User S', '0900000019', 'hash', 'https://i.pravatar.cc/150?img=23', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(25, 'User T', '0900000020', 'hash', 'https://i.pravatar.cc/150?img=24', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(26, 'User U', '0900000021', 'hash', 'https://i.pravatar.cc/150?img=25', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(27, 'User V', '0900000022', 'hash', 'https://i.pravatar.cc/150?img=26', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(28, 'User W', '0900000023', 'hash', 'https://i.pravatar.cc/150?img=27', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(29, 'User X', '0900000024', 'hash', 'https://i.pravatar.cc/150?img=28', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(30, 'User Y', '0900000025', 'hash', 'https://i.pravatar.cc/150?img=29', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(31, 'User Z', '0900000026', 'hash', 'https://i.pravatar.cc/150?img=30', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(32, 'User AA', '0900000027', 'hash', 'https://i.pravatar.cc/150?img=31', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(33, 'User AB', '0900000028', 'hash', 'https://i.pravatar.cc/150?img=32', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(34, 'User AC', '0900000029', 'hash', 'https://i.pravatar.cc/150?img=33', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(35, 'User AD', '0900000030', 'hash', 'https://i.pravatar.cc/150?img=34', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(36, 'User AE', '0900000031', 'hash', 'https://i.pravatar.cc/150?img=35', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(37, 'User AF', '0900000032', 'hash', 'https://i.pravatar.cc/150?img=36', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(38, 'User AG', '0900000033', 'hash', 'https://i.pravatar.cc/150?img=37', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(39, 'User AH', '0900000034', 'hash', 'https://i.pravatar.cc/150?img=38', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(40, 'User AI', '0900000035', 'hash', 'https://i.pravatar.cc/150?img=39', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(41, 'User AJ', '0900000036', 'hash', 'https://i.pravatar.cc/150?img=40', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(42, 'User AK', '0900000037', 'hash', 'https://i.pravatar.cc/150?img=41', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(43, 'User AL', '0900000038', 'hash', 'https://i.pravatar.cc/150?img=42', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(44, 'User AM', '0900000039', 'hash', 'https://i.pravatar.cc/150?img=43', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(45, 'User AN', '0900000040', 'hash', 'https://i.pravatar.cc/150?img=44', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(46, 'User AO', '0900000041', 'hash', 'https://i.pravatar.cc/150?img=45', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(47, 'User AP', '0900000042', 'hash', 'https://i.pravatar.cc/150?img=46', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(48, 'User AQ', '0900000043', 'hash', 'https://i.pravatar.cc/150?img=47', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(49, 'User AR', '0900000044', 'hash', 'https://i.pravatar.cc/150?img=48', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00'),
(50, 'User AS', '0900000045', 'hash', 'https://i.pravatar.cc/150?img=49', NULL, 'user', 'active', NULL, '2026-01-08 15:35:48', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user_activity_logs`
--

CREATE TABLE `user_activity_logs` (
  `id` varchar(255) NOT NULL COMMENT 'ObjectId (MongoDB)',
  `user_id` int(11) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL COMMENT 'view, search, click',
  `target_id` int(11) DEFAULT NULL,
  `details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Lưu search keyword, thời gian xem...' CHECK (json_valid(`details`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='NoSQL Collection: Lưu lịch sử để AI học';

--
-- Dumping data for table `user_activity_logs`
--

INSERT INTO `user_activity_logs` (`id`, `user_id`, `action`, `target_id`, `details`, `created_at`) VALUES
('log_001', 2, 'view', 1, '{\"duration\": 120, \"device\": \"mobile\"}', '2026-01-08 15:42:07'),
('log_002', 2, 'search', NULL, '{\"keyword\": \"Phở bò\", \"results\": 5}', '2026-01-08 15:42:07'),
('log_003', 2, 'view', 2, '{\"duration\": 60, \"device\": \"desktop\"}', '2026-01-08 15:42:07'),
('log_004', 3, 'view', 3, '{\"duration\": 200, \"device\": \"mobile\"}', '2026-01-08 15:42:07'),
('log_005', 3, 'search', NULL, '{\"keyword\": \"Eat clean\", \"results\": 10}', '2026-01-08 15:42:07'),
('log_006', 3, 'click_tag', NULL, '{\"tag\": \"Healthy\"}', '2026-01-08 15:42:07'),
('log_007', 4, 'view', 5, '{\"duration\": 300, \"device\": \"tablet\"}', '2026-01-08 15:42:07'),
('log_008', 2, 'view', 7, '{\"duration\": 90, \"device\": \"mobile\"}', '2026-01-08 15:42:07'),
('log_009', 5, 'view', 9, '{\"duration\": 150, \"device\": \"desktop\"}', '2026-01-08 15:42:07'),
('log_010', 2, 'save', 1, '{\"cookbook_id\": 1}', '2026-01-08 15:42:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category_recipe`
--
ALTER TABLE `category_recipe`
  ADD KEY `recipe_id` (`recipe_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `recipe_id` (`recipe_id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `cookbooks`
--
ALTER TABLE `cookbooks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cookbook_recipes`
--
ALTER TABLE `cookbook_recipes`
  ADD KEY `cookbook_id` (`cookbook_id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `interactions`
--
ALTER TABLE `interactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `meal_plans`
--
ALTER TABLE `meal_plans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notifications_user` (`user_id`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_id` (`recipe_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- Indexes for table `recipe_steps`
--
ALTER TABLE `recipe_steps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reporter_id` (`reporter_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Indexes for table `user_activity_logs`
--
ALTER TABLE `user_activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `cookbooks`
--
ALTER TABLE `cookbooks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `interactions`
--
ALTER TABLE `interactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `meal_plans`
--
ALTER TABLE `meal_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `recipe_steps`
--
ALTER TABLE `recipe_steps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=246;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `category_recipe`
--
ALTER TABLE `category_recipe`
  ADD CONSTRAINT `category_recipe_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`),
  ADD CONSTRAINT `category_recipe_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`),
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`);

--
-- Constraints for table `cookbooks`
--
ALTER TABLE `cookbooks`
  ADD CONSTRAINT `cookbooks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `cookbook_recipes`
--
ALTER TABLE `cookbook_recipes`
  ADD CONSTRAINT `cookbook_recipes_ibfk_1` FOREIGN KEY (`cookbook_id`) REFERENCES `cookbooks` (`id`),
  ADD CONSTRAINT `cookbook_recipes_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`);

--
-- Constraints for table `interactions`
--
ALTER TABLE `interactions`
  ADD CONSTRAINT `interactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `interactions_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`);

--
-- Constraints for table `meal_plans`
--
ALTER TABLE `meal_plans`
  ADD CONSTRAINT `meal_plans_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `meal_plans_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notifications_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD CONSTRAINT `recipe_ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`),
  ADD CONSTRAINT `recipe_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`);

--
-- Constraints for table `recipe_steps`
--
ALTER TABLE `recipe_steps`
  ADD CONSTRAINT `recipe_steps_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`);

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`reporter_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_activity_logs`
--
ALTER TABLE `user_activity_logs`
  ADD CONSTRAINT `user_activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
