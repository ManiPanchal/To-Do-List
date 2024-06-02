/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
DROP TABLE IF EXISTS todo;
CREATE TABLE `todo` (
  `id` varchar(50) NOT NULL,
  `task` varchar(50) NOT NULL,
  `due_date` varchar(50) NOT NULL,
  `flag` varchar(15) NOT NULL,
  `description` varchar(200) NOT NULL,
  `assigned` varchar(20) NOT NULL,
  `start_time` varchar(20) NOT NULL,
  `end_time` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
INSERT INTO todo(id,task,due_date,flag,description,assigned,start_time,end_time) VALUES('1709811134585','task1','2024-03-29','Pending','vhg','2024-03-07','19:02','20:02'),('1709811696430','task2','2024-03-16','Completed','zxcvbn','2024-03-07','14:11','15:11'),('1709817097688','task1','2024-03-23','Pending','zxcv','2024-03-07','18:41','19:41'),('1709817113368','task78','2024-03-15','Assigned','xcvbn','2024-03-07','19:41','20:41'),('1709817133341','task89','2024-03-23','Assigned','xcvbn','2024-03-07','19:42','23:42'),('1709817150013','task90','2024-03-22','Assigned','xcvbn','2024-03-07','17:42','19:42'),('1709817185906','task712','2024-03-15','Assigned','xcvbn','2024-03-07','22:43','23:43'),('1709817205597','task12','2024-03-30','Assigned','qwert','2024-03-07','12:43','13:43'),('1709817225704','task56','2024-03-08','Assigned','zxcvb','2024-03-07','08:43','09:43'),('1709817254748','task78643','2024-03-22','Assigned','xcvb','2024-03-07','10:44','12:44'),('1709817275362','task09','2024-03-08','Assigned','xcv','2024-03-07','07:44','08:44'),('1709817522371','task6736','2024-03-30','Assigned','xcvbn','2024-03-07','19:48','20:48'),('1709817861856','task837489','2024-03-08','Assigned','xcccccccvbn','2024-03-07','13:54','17:54');