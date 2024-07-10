-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2024 at 02:10 AM
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
  `complaint_details` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cases_tbl`
--

INSERT INTO `cases_tbl` (`case_id`, `complainant_id`, `respondent_id`, `place_of_occurrence`, `date_time_occurrence`, `complaint_type`, `complaint_details`) VALUES
(1, 1, 1, 'dri lang', '2024-07-10 02:10:05', 'garbage', 'new baho');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cases_tbl`
--
ALTER TABLE `cases_tbl`
  MODIFY `case_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
