-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2024 at 05:51 PM
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
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_data`
--

INSERT INTO `customer_data` (`cus_id`, `info`, `parent_name`, `phone_number`, `shirt`, `cus_order`, `status`) VALUES
(0, 'test', 'test', 'test', '{\"text_right\":{\"textright_input\":\"\",\"color_right\":\"#0000FF\",\"textleft_input\":\"test\"},\"text_left\":{\"textleft_input\":\"test\",\"color_left\":\"#0000FF\",\"textright_input\":\"\"},\"dot\":{\"type\":\"\",\"position\":\"\",\"amount_dot\":\"\",\"color_dot\":\"\"},\"Logo_right\":{\"school_name\":\"โรงเรียนศรี\",\"image_path\":\"http://localhost:5000/uploads/Sriboonya.jpg\"},\"Logo_left\":{\"school_name\":\"ไม่มี\",\"image_path\":null}}', NULL, 'ยังไม่ตรวจสอบ');

-- --------------------------------------------------------

--
-- Table structure for table `custom_input`
--

CREATE TABLE `custom_input` (
  `customer_ID` int(30) NOT NULL,
  `text_right` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`text_right`)),
  `logo_right` varchar(255) NOT NULL,
  `Info` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `custom_input`
--

INSERT INTO `custom_input` (`customer_ID`, `text_right`, `logo_right`, `Info`) VALUES
(6, '{\"textright_input\":\"141433412\",\"color_right\":\"#ff0000\"}', 'test', 'test1'),
(7, '{\"textright_input\":\"asdfe\",\"color_right\":\"#0000FF\"}', 'test', 'test1'),
(8, '{\"textright_input\":\"dadsa\",\"color_right\":\"#0000FF\",\"textleft_input\":\"adsadssdaasd\"}', 'test', 'test1');

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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer_data`
--
ALTER TABLE `customer_data`
  ADD PRIMARY KEY (`cus_id`);

--
-- Indexes for table `custom_input`
--
ALTER TABLE `custom_input`
  ADD PRIMARY KEY (`customer_ID`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer_data`
--
ALTER TABLE `customer_data`
  MODIFY `cus_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `custom_input`
--
ALTER TABLE `custom_input`
  MODIFY `customer_ID` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
