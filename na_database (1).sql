-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 05, 2024 at 07:39 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `na_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer_data`
--

CREATE TABLE `customer_data` (
  `cus_id` int(10) NOT NULL,
  `info` varchar(500) NOT NULL,
  `parent_name` varchar(255) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `shirt` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `PE` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `scout` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `cus_order` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `price` varchar(100) DEFAULT NULL,
  `is_paid` varchar(100) DEFAULT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `approve_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_data`
--

INSERT INTO `customer_data` (`cus_id`, `info`, `parent_name`, `phone_number`, `shirt`, `PE`, `scout`, `cus_order`, `status`, `price`, `is_paid`, `date_time`, `approve_by`) VALUES
(1, 'ปักเสื้อนักเรียน ค.บ.', 'สมชาย', '0812345678', '{\"Selected\":true,\"SName\":{\"fullname\":\"วรรณณา กานดี\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"ค.บ.\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"path\":\"/image_folder/L_Shirt.png\",\"SName\":{\"fullname\":\"\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"Blue\",\"color_border\":\"#FCF5E5\",\"cloth\":\"White\"}}', '[{\"id\":1,\"value1\":\"ปักเสื้อนักเรียน\",\"value2\":\"1\",\"value3\":\"60\",\"value4\":\"60\"}]', 'การปักเสร็จสิ้น', '60', '0', '2024-08-06 13:49:13', 'Admin_Na'),
(2, 'ปักจุด 3 จุก น้ำเงิน', 'สมหญิง', '0823456789', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"path\":\"/image_folder/L_Shirt.png\",\"SName\":{\"fullname\":\"\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"Blue\",\"color_border\":\"#FCF5E5\",\"cloth\":\"White\"}}', '[{\"id\":1,\"value1\":\"ปักจุด\",\"value2\":\"3\",\"value3\":\"10\",\"value4\":\"30\"}]', 'การปักเสร็จสิ้น', '30', '1', '2024-09-03 13:49:13', 'Admin_Na'),
(3, 'ปักชื่อ', 'ธนพล', '0834567890', '{\"Selected\":true,\"SName\":{\"fullname\":\"อรายา ผาสุข\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\"},\"SLogo\":{\"school_name\":\"โรงเรียนเทศบาลศรีบุณยานุสสรณ์\",\"image_path\":\"/uploads/2-removebg-preview.png\",\"position_l\":\"โลโก้ด้านขวา\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"path\":\"/image_folder/L_Shirt.png\",\"SName\":{\"fullname\":\"\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"Blue\",\"color_border\":\"#FCF5E5\",\"cloth\":\"White\"}}', '[{\"id\":1,\"value1\":\"ปักเสื้อ รร.ศรี\",\"value2\":\"1\",\"value3\":\"60\",\"value4\":\"60\"}]', 'การปักเสร็จสิ้น', '60', '0', '2024-09-05 13:49:13', 'Admin_Na'),
(4, 'ว.ส.ค. ม.6', 'อรทัย', '0845678901', '{\"Selected\":true,\"SName\":{\"fullname\":\"อนุสรณ์ อั๋นประเสริฐ\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\"},\"SLogo\":{\"school_name\":\"โรงเรียนกระทุ่มแบน \\\"วิเศษสมุทคุณ\\\"\",\"image_path\":\"/uploads/4-removebg-preview.png\",\"position_l\":\"โลโก้ด้านขวา\"},\"dot\":{\"type\":\"จุด\",\"position\":\"บนชื่อนักเรียน\",\"amount_dot\":\"3\",\"color_dot\":\"#0000FF\"}}', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"path\":\"/image_folder/L_Shirt.png\",\"SName\":{\"fullname\":\"\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"Blue\",\"color_border\":\"#FCF5E5\",\"cloth\":\"White\"}}', '[{\"id\":1,\"value1\":\"ว.ส.ค. ม.6\",\"value2\":\"1\",\"value3\":\"60\",\"value4\":\"60\"}]', 'การปักเสร็จสิ้น', '60', '1', '2024-09-05 13:49:13', 'Admin_Na'),
(5, 'โรงเรียนวัดดอน', 'ปกรณ์', '0856789012', '{\"Selected\":true,\"SName\":{\"fullname\":\"วันนา นาดี\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\",\"fullname\":\"วันนา นาดี\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\",\"fullname\":\"วันนา นาดี\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\",\"fullname\":\"วันนา นาดี\"},\"SLogo\":{\"school_name\":\"โรงเรียนเทศบาลวัดดอนไก่ดี\",\"image_path\":\"/uploads/3-removebg-preview.png\",\"position_l\":\"โลโก้ด้านขวา\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"path\":\"/image_folder/L_Shirt.png\",\"SName\":{\"fullname\":\"\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"Blue\",\"color_border\":\"#FCF5E5\",\"cloth\":\"White\"}}', '[{\"id\":1,\"value1\":\"ปักโรงเรียนวัดดอน\",\"value2\":\"1\",\"value3\":\"50\",\"value4\":\"50\"}]', 'การปักเสร็จสิ้น', '50', '1', '2024-09-24 13:49:13', 'Admin_Na'),
(6, '', 'บุญมี', '0867890123', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":true,\"SName\":{\"fullname\":\"อัครเดช อนามี\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\",\"fullname\":\"อัครเดช อนามี\"},\"dot\":{\"type\":\"จุด\",\"position\":\"บนปกขวา\",\"amount_dot\":\"3\",\"color_dot\":\"#ff0000\"}}', '{\"Selected\":false,\"path\":\"/image_folder/L_Shirt.png\",\"SName\":{\"fullname\":\"\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"Blue\",\"color_border\":\"#FCF5E5\",\"cloth\":\"White\"}}', '[{\"id\":1,\"value1\":\"ปักเสื้อพละ\",\"value2\":\"1\",\"value3\":\"50\",\"value4\":\"50\"}]', 'การปักเสร็จสิ้น', '50', '1', '2024-09-16 13:49:13', 'Admin_Na'),
(7, 'ข้อมูลลูกค้า 7', 'วิชัย', '0878901234', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":true,\"path\":\"/image_folder/L_Shirt.png\",\"SName\":{\"fullname\":\"โอม\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"black\",\"color_border\":\"#FCF5E5\",\"cloth\":\"white\"}}', '[{\"id\":1,\"value1\":\"โอม\",\"value2\":\"1\",\"value3\":\"50\",\"value4\":\"50\"}]', 'การปักเสร็จสิ้น', '50', '1', '2024-09-11 13:49:13', 'Admin_Na'),
(8, '', 'สมจิตร', '0889012345', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":true,\"path\":\"/image_folder/N_Shirt.png\",\"SName\":{\"fullname\":\"อายา\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"yellow\",\"color_border\":\"black\",\"cloth\":\"#36454F\"}}', '[{\"id\":1,\"value1\":\"ปักชื่อเนตรนารี\",\"value2\":\"1\",\"value3\":\"50\",\"value4\":\"50\"}]', 'การปักเสร็จสิ้น', '50', '0', '2024-09-05 13:49:13', 'Admin_Na'),
(9, 'ข้อมูลลูกค้า 9', 'บุญจันทร์', '0890123456', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":true,\"path\":\"/image_folder/L_Shirt.png\",\"SName\":{\"fullname\":\"อนุสรณ์ อั๋นประเสริฐ\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"Blue\",\"color_border\":\"#FCF5E5\",\"cloth\":\"White\"}}', '[{\"id\":1,\"value1\":\"ปักเสื้อลูกเสือ\",\"value2\":\"1\",\"value3\":\"60\",\"value4\":\"60\"}]', 'การปักเสร็จสิ้น', '60', '1', '2024-09-05 13:49:13', 'Admin_Na'),
(10, '-', 'สุนทร', '0813456789', '{\"Selected\":true,\"SName\":{\"fullname\":\"พรนภา ตาดี\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\",\"name\":\"ป.ล.\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\",\"fullname\":\"พรนภา ตาดี\",\"name\":\"ป.ล.\"},\"SSchool\":{\"name\":\"ป.ล.\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\",\"fullname\":\"พรนภา ตาดี\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\",\"fullname\":\"พรนภา ตาดี\",\"name\":\"ป.ล.\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"path\":\"/image_folder/L_Shirt.png\",\"SName\":{\"fullname\":\"\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"Blue\",\"color_border\":\"#FCF5E5\",\"cloth\":\"White\"}}', '[{\"id\":1,\"value1\":\"ปักชื่อและป.ล.\",\"value2\":\"1\",\"value3\":\"40\",\"value4\":\"40\"}]', 'การปักเสร็จสิ้น', '40', '1', '2024-09-05 13:49:13', 'Admin_Na'),
(11, 'ไม่มี', 'สมปอง', '0846789012', '{\"Selected\":true,\"SName\":{\"fullname\":\"จาพนม\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"path\":\"/image_folder/L_Shirt.png\",\"SName\":{\"fullname\":\"\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"Blue\",\"color_border\":\"#FCF5E5\",\"cloth\":\"White\"}}', '[{\"id\":1,\"value1\":\"30\",\"value2\":\"1\",\"value3\":\"25\",\"value4\":\"25\"}]', 'การปักเสร็จสิ้น', '25', '1', '2024-09-09 13:49:13', 'Admin_Na'),
(12, 'ข้อมูลลูกค้า 14', 'ประยูร', '0857890123', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"path\":\"/image_folder/L_Shirt.png\",\"SName\":{\"fullname\":\"\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"Blue\",\"color_border\":\"#FCF5E5\",\"cloth\":\"White\"}}', '[{\"id\":1,\"value1\":\"ข้อมูล\",\"value2\":\"1\",\"value3\":\"25\",\"value4\":\"25\"}]', 'กำลังดำเนินการ', '25', '0', '2024-09-16 13:49:13', 'Admin_Na'),
(13, 'ข้อมูลลูกค้า 15', 'อารีย์', '0868901234', '{\"Selected\":true,\"SName\":{\"fullname\":\"ธรนี มันดี\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\",\"name\":\"ส.ค.ณ.\",\"under_school\":\"๑๒๑๖๕\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\",\"fullname\":\"ธรนี มันดี\",\"name\":\"ส.ค.ณ.\",\"under_school\":\"๑๒๑๖๕\"},\"SSchool\":{\"name\":\"ส.ค.ณ.\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\",\"fullname\":\"ธรนี มันดี\",\"under_school\":\"๑๒๑๖๕\"},\"SUnderschool\":{\"under_school\":\"๑๒๑๖๕\",\"color01\":\"#0000FF\",\"fullname\":\"ธรนี มันดี\",\"name\":\"ส.ค.ณ.\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"จุด\",\"position\":\"บนปกซ้าย\",\"amount_dot\":\"3\",\"color_dot\":\"#0000FF\"}}', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"path\":\"/image_folder/L_Shirt.png\",\"SName\":{\"fullname\":\"\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"Blue\",\"color_border\":\"#FCF5E5\",\"cloth\":\"White\"}}', '[{\"id\":1,\"value1\":\"ปัก ส.ค.ณ\",\"value2\":\"1\",\"value3\":\"50\",\"value4\":\"50\"}]', 'กำลังดำเนินการ', '50', '1', '2024-09-05 13:49:13', 'Admin_Na'),
(14, 'ข้อมูลลูกค้า 16', 'วิทยา', '0879012345', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":true,\"SName\":{\"fullname\":\"อมรรัตน์ สวามี\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"ดาว\",\"position\":\"บนชื่อนักเรียนด้านขวา\",\"amount_dot\":\"1\",\"color_dot\":\"#ff0000\"}}', '{\"Selected\":false,\"path\":\"/image_folder/L_Shirt.png\",\"SName\":{\"fullname\":\"\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"Blue\",\"color_border\":\"#FCF5E5\",\"cloth\":\"White\"}}', '[{\"id\":1,\"value1\":\"ปักเสื้อพละ\",\"value2\":\"1\",\"value3\":\"40\",\"value4\":\"40\"}]', 'กำลังดำเนินการ', '40', '1', '2024-09-09 13:49:13', 'Admin_Na'),
(15, 'ข้อมูลลูกค้า 17', 'สมคิด', '0880123456', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"path\":\"/image_folder/L_Shirt.png\",\"SName\":{\"fullname\":\"\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"Blue\",\"color_border\":\"#FCF5E5\",\"cloth\":\"White\"}}', '[{\"id\":1,\"value1\":\"เลาะโลโก้โรงเรียน\",\"value2\":\"5\",\"value3\":\"15\",\"value4\":\"75\"}]', 'กำลังดำเนินการ', '75', '1', '2024-09-05 13:49:13', 'Admin_Na'),
(16, 'ข้อมูลลูกค้า 18', 'ปรีชา', '0891234567', '{\"Selected\":true,\"SName\":{\"fullname\":\"เปรมนัส กาญจนานุกูล\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\",\"under_name\":\"เทคโนโลยีสารสนเทศ\"},\"SUndername\":{\"under_name\":\"เทคโนโลยีสารสนเทศ\",\"color0\":\"#0000FF\",\"fullname\":\"เปรมนัส กาญจนานุกูล\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\",\"fullname\":\"เปรมนัส กาญจนานุกูล\",\"under_name\":\"เทคโนโลยีสารสนเทศ\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\",\"fullname\":\"เปรมนัส กาญจนานุกูล\",\"under_name\":\"เทคโนโลยีสารสนเทศ\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"path\":\"/image_folder/L_Shirt.png\",\"SName\":{\"fullname\":\"\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"Blue\",\"color_border\":\"#FCF5E5\",\"cloth\":\"White\"}}', '[{\"id\":1,\"value1\":\"ปักเสื้อ\",\"value2\":\"1\",\"value3\":\"50\",\"value4\":\"50\"}]', 'กำลังดำเนินการ', '50', '1', '2024-09-11 13:49:13', 'Admin_Na'),
(17, '', 'อนุสรณ์', '0655972855', '{\"Selected\":true,\"SName\":{\"fullname\":\"อนุสรณ์ อั๋นประเสริฐ\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\",\"under_name\":\"\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\",\"under_name\":\"\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\",\"under_name\":\"\"},\"SLogo\":{\"school_name\":\"โรงเรียนเทศบาลศรีบุณยานุสสรณ์\",\"image_path\":\"/uploads/2-removebg-preview.png\",\"position_l\":\"โลโก้ด้านขวา\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":true,\"SName\":{\"fullname\":\"อนุสรณ์ อั๋นประเสริฐ\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"จุด\",\"position\":\"บนชื่อนักเรียนด้านขวา\",\"amount_dot\":\"3\",\"color_dot\":\"#0000FF\"}}', '{\"Selected\":true,\"path\":\"/image_folder/L_Shirt.png\",\"SName\":{\"fullname\":\"อนุสรณ์ อั๋นประเสริฐ\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"black\",\"color_border\":\"#FCF5E5\",\"cloth\":\"white\"}}', '[{\"id\":1,\"value1\":\"ปักเสื้อนักเรียน โรงเรียนศรี\",\"value2\":\"1\",\"value3\":\"50\",\"value4\":\"50\"},{\"id\":2,\"value1\":\"ปักเสื้อพละ\",\"value2\":\"1\",\"value3\":\"40\",\"value4\":\"40\"},{\"id\":3,\"value1\":\"ปักป้ายลูกเสื้อพร้อมเย็บติด\",\"value2\":\"1\",\"value3\":\"50\",\"value4\":\"50\"}]', 'กำลังดำเนินการ', '140', '1', '2024-09-05 15:44:13', 'Admin_Na');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `name`, `path`) VALUES
(30, 'โรงเรียนเทศบาลศรีบุณยานุสสรณ์', './function_server/uploads/2-removebg-preview.png'),
(31, 'โรงเรียนเทศบาลวัดดอนไก่ดี', './function_server/uploads/3-removebg-preview.png'),
(32, 'โรงเรียนกระทุ่มแบน \"วิเศษสมุทคุณ\"', './function_server/uploads/4-removebg-preview.png'),
(34, 'ตรา กทม.', './function_server/uploads/5-removebg-preview.png'),
(35, 'โรงเรียนสามเสนวิทยาลัย', './function_server/uploads/[removal.ai]_1de2df43-910e-4eb8-a1aa-97435ba03dd3-image.png');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `School_name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `queue`
--

CREATE TABLE `queue` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `queue`
--

INSERT INTO `queue` (`id`, `name`) VALUES
(1, '1312'),
(2, 'asddsa');

-- --------------------------------------------------------

--
-- Table structure for table `school_data`
--

CREATE TABLE `school_data` (
  `SC_ID` int(30) NOT NULL,
  `school_form` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `school_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('manager','employee') NOT NULL,
  `profile` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `profile`) VALUES
(1, 'Admin_Na', '65209010044', 'manager', './profile/Remove-bg.ai_1725530624653.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer_data`
--
ALTER TABLE `customer_data`
  ADD PRIMARY KEY (`cus_id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `queue`
--
ALTER TABLE `queue`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_data`
--
ALTER TABLE `school_data`
  ADD PRIMARY KEY (`SC_ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer_data`
--
ALTER TABLE `customer_data`
  MODIFY `cus_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `queue`
--
ALTER TABLE `queue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `school_data`
--
ALTER TABLE `school_data`
  MODIFY `SC_ID` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
