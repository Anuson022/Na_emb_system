-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 25, 2024 at 07:18 PM
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
  `PE` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`PE`)),
  `scout` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`scout`)),
  `cus_order` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `is_paid` varchar(100) DEFAULT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `approve_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_data`
--

INSERT INTO `customer_data` (`cus_id`, `info`, `parent_name`, `phone_number`, `shirt`, `PE`, `scout`, `cus_order`, `status`, `price`, `is_paid`, `date_time`, `approve_by`) VALUES
(53, 'tas', '123', '111111', '{\"Selected\":true,\"SName\":{\"fullname\":\"asddsa\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\",\"name\":\"adgadgas\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\",\"name\":\"adgadgas\",\"fullname\":\"asddsa\"},\"SSchool\":{\"name\":\"adgadgas\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\",\"fullname\":\"asddsa\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\",\"name\":\"adgadgas\",\"fullname\":\"asddsa\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":true,\"SName\":{\"fullname\":\"jusy\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\",\"fullname\":\"jusy\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":true,\"path\":\"/image_folder/L_Shirt.png\",\"SName\":{\"fullname\":\"idk\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"Blue\",\"color_border\":\"#FCF5E5\",\"cloth\":\"White\"}}', NULL, 'ยังไม่ตรวจสอบ', NULL, NULL, '2024-08-24 09:23:58', NULL),
(54, '1312', '3121', '123', '{\"Selected\":true,\"SName\":{\"fullname\":\"3123\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"123\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\"},\"SLogo\":{\"school_name\":\"โรงเรียนวัดดอน\",\"image_path\":\"/uploads/watdon.png\",\"position_l\":\"โลโก้ด้านขวา\"},\"dot\":{\"type\":\"จุด\",\"position\":\"บนปกซ้าย\",\"amount_dot\":\"3\",\"color_dot\":\"#0000FF\"}}', '{\"Selected\":true,\"SName\":{\"fullname\":\"333333\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"ดาว\",\"position\":\"บนชื่อนักเรียนด้านขวา\",\"amount_dot\":\"1\",\"color_dot\":\"#0000FF\"}}', '{\"Selected\":true,\"path\":\"/image_folder/U_Shirt.png\",\"SName\":{\"fullname\":\"กดกห\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"yellow\",\"color_border\":\"red\",\"cloth\":\"lightcoral\"}}', '[{\"id\":1,\"value1\":\"12\",\"value2\":\"1\",\"value3\":\"1\",\"value4\":\"1\"}]', 'กำลังดำเนินการ', '1', '0', '2024-08-24 14:02:39', 'Admin'),
(55, '412', '144', '321', '{\"Selected\":true,\"SName\":{\"fullname\":\"123\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"555135\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\"},\"SLogo\":{\"school_name\":\"โรงเรียนศรี\",\"image_path\":\"/uploads/Sriboonya.jpg\",\"position_l\":\"โลโก้ด้านขวา\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":true,\"SName\":{\"fullname\":\"11111111111111155\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"ดาว\",\"position\":\"บนชื่อนักเรียนด้านซ้าย\",\"amount_dot\":\"1\",\"color_dot\":\"#0000FF\"}}', '{\"Selected\":true,\"path\":\"/image_folder/N_Shirt.png\",\"SName\":{\"fullname\":\"44444444444155\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"yellow\",\"color_border\":\"red\",\"cloth\":\"lightcoral\"}}', '[{\"id\":1,\"value1\":\"test\",\"value2\":\"12\",\"value3\":\"31\",\"value4\":\"372\"}]', 'การปักเสร็จสิ้น', '372', '1', '2024-08-24 18:23:17', NULL),
(56, 'asf', '321', '132', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านซ้าย\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"SSchool\":{\"name\":\"\",\"color1\":\"#0000FF\",\"position_s\":\"ชื่อโรงเรียนด้านขวา\"},\"SUnderschool\":{\"under_school\":\"\",\"color01\":\"#0000FF\"},\"SLogo\":{\"school_name\":\"\",\"image_path\":\"\",\"position_l\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"SName\":{\"fullname\":\"\",\"color\":\"#0000FF\",\"position_n\":\"ชื่อด้านขวา\"},\"SUndername\":{\"under_name\":\"\",\"color0\":\"#0000FF\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"}}', '{\"Selected\":false,\"path\":\"/image_folder/L_Shirt.png\",\"SName\":{\"fullname\":\"\",\"position_n\":\"ชื่อด้านขวา\",\"color\":\"Blue\",\"color_border\":\"#FCF5E5\",\"cloth\":\"White\"}}', '[{\"id\":1,\"value1\":\"31\",\"value2\":\"12\",\"value3\":\"11\",\"value4\":\"132\"}]', 'ยังไม่ตรวจสอบ', '132', '0', '2024-08-25 05:04:31', NULL);

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
(8, 'โรงเรียนวัดดอน', './uploads/watdon.png');

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
(1, 'Adminssss', '123', 'manager', './profile/382235163_305227282247688_105362962158153298_n.jpg'),
(32, 'aa1', 'ss12', 'manager', './profile/qrcode_121407963_fcb1f3d6f122cc77bec7c72a9dfe6dbf.png'),
(36, '12', '312', 'employee', './profile/432023811_867354795401891_3059705815488649925_n.jpg');

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
  MODIFY `cus_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
