-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2024 at 04:49 AM
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
-- Database: `crime_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cases_tbl`
--

CREATE TABLE `cases_tbl` (
  `case_id` int(11) NOT NULL,
  `complainant_id` int(11) NOT NULL,
  `respondent_id` int(11) NOT NULL,
  `place_of_occurrence` varchar(150) DEFAULT NULL,
  `date_time_occurrence` datetime NOT NULL,
  `complaint_type` varchar(50) DEFAULT NULL,
  `complaint_details` text DEFAULT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cases_tbl`
--

INSERT INTO `cases_tbl` (`case_id`, `complainant_id`, `respondent_id`, `place_of_occurrence`, `date_time_occurrence`, `complaint_type`, `complaint_details`, `status`) VALUES
(1, 1, 1, 'dri lang', '2024-07-10 02:10:05', 'garbage', 'new baho', 3),
(2, 2, 2, 'dri lang', '2024-07-11 10:18:20', 'noise', 'adsad', 1),
(3, 3, 3, 'dadto', '2024-07-11 10:22:19', 'garbage', 'baho kaayo ang basura nila fritz', 3),
(4, 4, 4, 'cl5', '2024-07-11 15:19:03', 'noise', 'sige ko kasaban', 3),
(5, 5, 5, 'cl5', '2024-07-11 15:20:09', 'noise', 'sige ko kasaban ngano mana HAHAHAHAHHAHAHAHAHAHAHHAHAHAHAHAHAHA\nHAHAHAHAHAH', 0),
(6, 6, 6, 'cdo', '2024-07-11 15:22:26', 'noise', 'Wake up to reality! Nothing ever goes as planned in this accursed world. The longer you live, the more you realize that the only things that truly exist in this reality are merely pain. suffering and futility. Listen, everywhere you look in this world, wherever there is light, there will always be shadows to be found as well. As long as there is a concept of victors, the vanquished will also exist. The selfish intent of wanting to preserve peace, initiates war. and hatred is born in order to protect love. There are nexuses causal relationships that cannot be separated.\n\nI want to severe the fate of this world. A world of only Victors. A world of only Peace. A world of only love. I will create such a world.\n\nI am.\n\nThe Ghost Of The Uchiha\n\nFor truly this reality...\n\nIs a Hell. -', 0),
(7, 7, 7, 'Poblacion, Talisayan, Misamis Oriental, Philippines', '2024-07-18 05:21:14', 'garbage', 'baho', 0);

-- --------------------------------------------------------

--
-- Table structure for table `complainants_tbl`
--

CREATE TABLE `complainants_tbl` (
  `complainants_id` int(11) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `mname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `number` varchar(20) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `age` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `complainants_tbl`
--

INSERT INTO `complainants_tbl` (`complainants_id`, `fname`, `mname`, `lname`, `email`, `number`, `address`, `age`) VALUES
(1, 'test', 'test', 'test', 'joksan@m.com', '0123981', 'dri lang', NULL),
(2, 'asdad', 'asdasda', 'sdasdasd', 'joksan@m.com', '012345', 'dri lang', NULL),
(3, 'heidern', 'v', 'montejo', 'joksan@m.com', '0123981', 'dadto', NULL),
(4, 'giann', 'gwapo', 'legaspi', 'Isidro@gmail.com', '0999999999', 'cl5', NULL),
(5, 'giann', 'gwapo', 'legaspi', 'Isidro@gmail.com', '0999999999', 'cl5', NULL),
(6, 'giann', 'gwapo', 'legaspi', 'Isidro@gmail.com', '0123981', 'cdo', NULL),
(7, 'giann', 'isidore', 'legaspi', 'giannesidore@gmail.com', '09955658532', 'Poblacion, Talisayan, Misamis Oriental, Philippines', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee_tbl`
--

CREATE TABLE `employee_tbl` (
  `employee_id` int(11) NOT NULL,
  `employee_fname` varchar(30) NOT NULL,
  `employee_mname` varchar(20) DEFAULT NULL,
  `employee_lname` varchar(20) NOT NULL,
  `employee_email` varchar(50) NOT NULL,
  `employee_password` varchar(50) NOT NULL,
  `employee_role` int(11) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT current_timestamp(),
  `added_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_tbl`
--

INSERT INTO `employee_tbl` (`employee_id`, `employee_fname`, `employee_mname`, `employee_lname`, `employee_email`, `employee_password`, `employee_role`, `date_added`, `added_by`) VALUES
(1, 'Heidern', 'Villasencio', 'Montejo', 'test@gmail.com', '01231230', 1, '2024-07-10 00:33:26', 0),
(2, 'Giann', 'Isidore', 'Legaspi', 'giann@giann.com', 'giann123', 0, '2024-07-14 18:53:03', 0);

-- --------------------------------------------------------

--
-- Table structure for table `outsiders`
--

CREATE TABLE `outsiders` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `suffix` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `added_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `outsiders`
--

INSERT INTO `outsiders` (`id`, `first_name`, `middle_name`, `last_name`, `suffix`, `email`, `phone`, `address`, `created_at`, `updated_at`, `added_by`) VALUES
(1, 'heidern', 'v ', 'montejo', 'wala', 'test@gmail.com', '01203', 'didto', '2024-07-21 14:17:51', '2024-07-21 14:17:51', 0),
(2, 'test', 'test jaoun', 'test rani', 'jr', 'test@gmail.com', '0909090909', 'didti sa kuan', '2024-07-21 14:26:46', '2024-07-21 14:26:46', 0),
(3, 'Francine Shaina', 'J.', 'Pagaspas', '', 'france@gmail.com', '09955658532', 'alub', '2024-07-22 02:36:52', '2024-07-22 02:36:52', 0);

-- --------------------------------------------------------

--
-- Table structure for table `residents`
--

CREATE TABLE `residents` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `suffix` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `added_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `residents`
--

INSERT INTO `residents` (`id`, `first_name`, `middle_name`, `last_name`, `suffix`, `email`, `phone`, `address`, `created_at`, `updated_at`, `added_by`) VALUES
(1, 'Giann Isidore', 'a', 'Legaspi', 'jr', 'giannesidore@gmail.com', '09955658532', 'Poblacion, Talisayan, Misamis Oriental, Philippines', '2024-07-21 14:25:22', '2024-07-21 14:25:22', 0),
(2, 'test pero resident', 'test japun', 'test rani', 'jr', 'test@gmail.com', '0909090909', 'didti sa kuan', '2024-07-21 14:27:11', '2024-07-21 14:27:11', 0),
(3, 'Giann Isidore', '', 'Legaspi', '', 'giannesidore@gmail.com', '09955658532', 'Poblacion, Talisayan, Misamis Oriental, Philippines', '2024-07-22 02:35:24', '2024-07-22 02:35:24', 0);

-- --------------------------------------------------------

--
-- Table structure for table `respondents_tbl`
--

CREATE TABLE `respondents_tbl` (
  `respondent_id` int(11) NOT NULL,
  `respondent_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `respondents_tbl`
--

INSERT INTO `respondents_tbl` (`respondent_id`, `respondent_name`) VALUES
(1, 'bago gani'),
(2, 'si rudgel'),
(3, 'si fritz'),
(4, 'Si Francine'),
(5, 'Si Francine'),
(6, 'Si Francine'),
(7, 'si kuan');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cases_tbl`
--
ALTER TABLE `cases_tbl`
  ADD PRIMARY KEY (`case_id`),
  ADD KEY `fk_cases_complainants` (`complainant_id`),
  ADD KEY `fk_cases_respondents` (`respondent_id`);

--
-- Indexes for table `complainants_tbl`
--
ALTER TABLE `complainants_tbl`
  ADD PRIMARY KEY (`complainants_id`);

--
-- Indexes for table `employee_tbl`
--
ALTER TABLE `employee_tbl`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `outsiders`
--
ALTER TABLE `outsiders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `residents`
--
ALTER TABLE `residents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `respondents_tbl`
--
ALTER TABLE `respondents_tbl`
  ADD PRIMARY KEY (`respondent_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cases_tbl`
--
ALTER TABLE `cases_tbl`
  MODIFY `case_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `complainants_tbl`
--
ALTER TABLE `complainants_tbl`
  MODIFY `complainants_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `employee_tbl`
--
ALTER TABLE `employee_tbl`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `outsiders`
--
ALTER TABLE `outsiders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `residents`
--
ALTER TABLE `residents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `respondents_tbl`
--
ALTER TABLE `respondents_tbl`
  MODIFY `respondent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cases_tbl`
--
ALTER TABLE `cases_tbl`
  ADD CONSTRAINT `fk_cases_complainants` FOREIGN KEY (`complainant_id`) REFERENCES `complainants_tbl` (`complainants_id`),
  ADD CONSTRAINT `fk_cases_respondents` FOREIGN KEY (`respondent_id`) REFERENCES `respondents_tbl` (`respondent_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
