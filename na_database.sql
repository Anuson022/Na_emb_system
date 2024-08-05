-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 05, 2024 at 03:30 PM
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
  `cus_order` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `is_paid` varchar(100) DEFAULT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_data`
--

INSERT INTO `customer_data` (`cus_id`, `info`, `parent_name`, `phone_number`, `shirt`, `cus_order`, `status`, `price`, `is_paid`, `date_time`) VALUES
(3, 'idk', '123', '010', '{\"SName\":{\"fullname\":\"อนุสรณ์ อั๋นประเสริฐ\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\",\"name\":\"\"},\"SUndername\":{\"under_name\":\"ฟหก\",\"color0\":\"#0000FF\",\"name\":\"\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '[{\"id\":1,\"value1\":\"test\",\"value2\":\"1\",\"value3\":\"50\",\"value4\":\"50\"}]', 'กำลังดำเนินการ', '50', '1', '2024-08-02 02:23:39'),
(4, '', '', '11111111', '{\"SName\":{\"fullname\":\"idk\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\",\"fullname\":\"idk\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\",\"fullname\":\"idk\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"โลโก้ด้านขวา\"},\"dot\":{\"type\":\"จุด\",\"position\":\"บนชื่อโรงเรียน\",\"amount_dot\":\"1\",\"color_dot\":\"#0000FF\"}}', '[{\"id\":1,\"value1\":\"no money\",\"value2\":\"0\",\"value3\":\"0\",\"value4\":\"0\"}]', 'การปักเสร็จสิ้น', '0', '0', '2024-08-02 03:56:57'),
(5, 'sfdag1', 'tdfhhsgf', '010', '{\"SName\":{\"fullname\":\"asdafsa\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"231312\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"โลโก้ด้านขวา\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '[{\"id\":1,\"value1\":\"100\",\"value2\":\"100\",\"value3\":\"100\",\"value4\":\"10000\"}]', 'กำลังดำเนินการ', '10000', '0', '2024-08-02 07:39:02'),
(6, '', '', '', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 14:23:09'),
(7, '', '', '', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 14:23:16'),
(8, '', 'กดหฟดห', '', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 14:30:25'),
(9, '', '', '', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 14:40:34'),
(10, '', '', '', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 14:40:50'),
(11, '', '', '', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 14:55:53'),
(12, '', 'yrd', '242', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 15:37:45'),
(13, '', '', '', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 15:44:45'),
(14, '', '', '', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 15:54:45'),
(15, '', '', '', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 15:55:13'),
(16, '', '', '', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 15:55:35'),
(17, '', '', '', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 15:55:37'),
(18, '', '', '', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 16:05:12'),
(19, '', '', '', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 16:10:07'),
(20, '', '', '', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 16:11:43'),
(21, '', '', '', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 16:11:59'),
(22, '', '', '', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 16:13:08'),
(23, '', '', '', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 16:13:23'),
(24, '', '', '', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 16:13:40'),
(25, '', '1321', '123213', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 16:19:44'),
(26, '', 'asdads', 'asd', '{\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-04 16:23:30');

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
(7, 'โรงเรียนศรี', './uploads/Sriboonya.jpg'),
(8, 'โรงเรียนวัดดอน', './uploads/watdon.png'),
(17, 'โรงเรียนคณะราษฎรบำรุง', './function_server/uploads/kb.png');

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
(19, 'test', '123', 'employee', './profile/S_Shirt.png'),
(20, 'test1112', '12311', 'employee', './profile/customize_487551.png');

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
  MODIFY `cus_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
