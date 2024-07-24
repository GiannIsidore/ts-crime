-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2024 at 02:52 AM
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
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `case_id` int(11) NOT NULL,
  `complainant_id` int(11) NOT NULL,
  `respondent_id` int(11) NOT NULL,
  `place_of_occurrence` varchar(255) NOT NULL,
  `date_time_occurrence` datetime NOT NULL,
  `complaint_type` varchar(100) NOT NULL,
  `complaint_details` text NOT NULL,
  `resolution` text DEFAULT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`case_id`, `complainant_id`, `respondent_id`, `place_of_occurrence`, `date_time_occurrence`, `complaint_type`, `complaint_details`, `resolution`, `status`) VALUES
(1, 1, 1, 'diri', '2024-07-24 02:07:43', '4', '\nWake up to reality! Nothing ever goes as planned in this accursed world. The longer you live, the more you realize that the only things that truly exist in this reality are merely pain. suffering and futility. Listen, everywhere you look in this world, wherever there is light, there will always be shadows to be found as well. As long as there is a concept of victors, the vanquished will also exist. The selfish intent of wanting to preserve peace, initiates war. and hatred is born in order to protect love. There are nexuses causal relationships that cannot be separated.\n\nI want to severe the fate of this world. A world of only Victors. A world of only Peace. A world of only love. I will create such a world.\n\nI am.\n\nThe Ghost Of The Uchiha\n\nFor truly this reality...\n\nIs a Hell. -Madara Uchiha', '\nWake up to reality! Nothing ever goes as planned in this accursed world. The longer you live, the more you realize that the only things that truly exist in this reality are merely pain. suffering and futility. Listen, everywhere you look in this world, wherever there is light, there will always be shadows to be found as well. As long as there is a concept of victors, the vanquished will also exist. The selfish intent of wanting to preserve peace, initiates war. and hatred is born in order to protect love. There are nexuses causal relationships that cannot be separated.\n\nI want to severe the fate of this world. A world of only Victors. A world of only Peace. A world of only love. I will create such a world.\n\nI am.\n\nThe Ghost Of The Uchiha\n\nFor truly this reality...\n\nIs a Hell. -Madara Uchiha', 2),
(2, 2, 2, 'coc', '2024-07-24 02:29:11', '2', 'gi sulatan og dragom (T_T)', 'dli na mag sulat sa dragon (～￣▽￣)～', 1);

-- --------------------------------------------------------

--
-- Table structure for table `complainant`
--

CREATE TABLE `complainant` (
  `complainant_id` int(11) NOT NULL,
  `complainant_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `complainant`
--

INSERT INTO `complainant` (`complainant_id`, `complainant_name`) VALUES
(1, 'Rachel A Legaspi '),
(2, 'Giann Isidore a Legaspi jr');

-- --------------------------------------------------------

--
-- Table structure for table `complaint_types`
--

CREATE TABLE `complaint_types` (
  `complaint_type_id` int(11) NOT NULL,
  `complaint_type_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `complaint_types`
--

INSERT INTO `complaint_types` (`complaint_type_id`, `complaint_type_name`) VALUES
(4, 'Fraud'),
(1, 'Noise'),
(5, 'Property Dispute'),
(3, 'Theft'),
(2, 'Vandalism');

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
(3, 'Francine Shaina', 'J.', 'Pagaspas', '', 'france@gmail.com', '09955658532', 'alub', '2024-07-22 02:36:52', '2024-07-22 02:36:52', 0),
(4, 'Rachel', 'A', 'Legaspi', '', 'rachel@rachel.com', '0999999999', 'talisayan', '2024-07-23 23:03:06', '2024-07-23 23:03:06', 0);

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
(3, 'Giann Isidore', '', 'Legaspi', '', 'giannesidore@gmail.com', '09955658532', 'Poblacion, Talisayan, Misamis Oriental, Philippines', '2024-07-22 02:35:24', '2024-07-22 02:35:24', 0),
(4, 'rudgel', 'gwapo', 'tagaan', '', 'gel@gel.com', '0909090909', 'didti', '2024-07-23 14:13:43', '2024-07-23 14:13:43', 0);

-- --------------------------------------------------------

--
-- Table structure for table `respondent`
--

CREATE TABLE `respondent` (
  `respondent_id` int(11) NOT NULL,
  `respondent_name` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `respondent`
--

INSERT INTO `respondent` (`respondent_id`, `respondent_name`) VALUES
(1, 'Giann Isidore  Legaspi '),
(2, 'rudgel gwapo tagaan ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`case_id`),
  ADD KEY `complainant_id` (`complainant_id`),
  ADD KEY `respondent_id` (`respondent_id`);

--
-- Indexes for table `complainant`
--
ALTER TABLE `complainant`
  ADD PRIMARY KEY (`complainant_id`);

--
-- Indexes for table `complaint_types`
--
ALTER TABLE `complaint_types`
  ADD PRIMARY KEY (`complaint_type_id`),
  ADD UNIQUE KEY `complaint_type_name` (`complaint_type_name`);

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
-- Indexes for table `respondent`
--
ALTER TABLE `respondent`
  ADD PRIMARY KEY (`respondent_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cases`
--
ALTER TABLE `cases`
  MODIFY `case_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `complainant`
--
ALTER TABLE `complainant`
  MODIFY `complainant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `complaint_types`
--
ALTER TABLE `complaint_types`
  MODIFY `complaint_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `employee_tbl`
--
ALTER TABLE `employee_tbl`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `outsiders`
--
ALTER TABLE `outsiders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `residents`
--
ALTER TABLE `residents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `respondent`
--
ALTER TABLE `respondent`
  MODIFY `respondent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cases`
--
ALTER TABLE `cases`
  ADD CONSTRAINT `cases_ibfk_1` FOREIGN KEY (`complainant_id`) REFERENCES `complainant` (`complainant_id`),
  ADD CONSTRAINT `cases_ibfk_2` FOREIGN KEY (`respondent_id`) REFERENCES `respondent` (`respondent_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
