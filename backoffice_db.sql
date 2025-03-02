-- MySQL dump 10.13  Distrib 9.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: backoffice_db
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrateur`
--

DROP TABLE IF EXISTS `administrateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrateur` (
  `id_admin` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` enum('super_admin','gestionnaire') NOT NULL,
  PRIMARY KEY (`id_admin`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrateur`
--

LOCK TABLES `administrateur` WRITE;
/*!40000 ALTER TABLE `administrateur` DISABLE KEYS */;
INSERT INTO `administrateur` VALUES (1,'Admin','Super','super.admin@example.com','hashed_password_5','super_admin'),(2,'Gestionnaire','Test','gestionnaire.test@example.com','hashed_password_6','gestionnaire');
/*!40000 ALTER TABLE `administrateur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidat`
--

DROP TABLE IF EXISTS `candidat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidat` (
  `id_candidat` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `date_inscription` datetime NOT NULL,
  `statut_candidature` enum('en_attente','validé','refusé') DEFAULT 'en_attente',
  `nombre_parrainages` int DEFAULT '0',
  PRIMARY KEY (`id_candidat`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidat`
--

LOCK TABLES `candidat` WRITE;
/*!40000 ALTER TABLE `candidat` DISABLE KEYS */;
INSERT INTO `candidat` VALUES (1,'Durand','Pierre','pierre.durand@example.com','hashed_password_3','2025-02-10 22:53:23','validé',0),(2,'Lefevre','Sophie','sophie.lefevre@example.com','hashed_password_4','2025-02-10 22:53:30','en_attente',0);
/*!40000 ALTER TABLE `candidat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electeur`
--

DROP TABLE IF EXISTS `electeur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electeur` (
  `id_electeur` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `date_inscription` datetime NOT NULL,
  `statut_validation` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_electeur`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electeur`
--

LOCK TABLES `electeur` WRITE;
/*!40000 ALTER TABLE `electeur` DISABLE KEYS */;
INSERT INTO `electeur` VALUES (1,'Dupont','Jean','jean.dupont@example.com','hashed_password_1','2025-02-10 22:52:57',1),(2,'Martin','Alice','alice.martin@example.com','hashed_password_2','2025-02-10 22:53:05',0);
/*!40000 ALTER TABLE `electeur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electeurs_temp`
--

DROP TABLE IF EXISTS `electeurs_temp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electeurs_temp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_electeur` int NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `date_naissance` date NOT NULL,
  `lieu_naissance` varchar(100) NOT NULL,
  `sexe` enum('M','F') NOT NULL,
  `carte_electeur` varchar(50) NOT NULL,
  `carte_cni` varchar(50) NOT NULL,
  `statut` enum('en_attente','valide','rejete') DEFAULT 'en_attente',
  `erreur` text,
  `date_import` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electeurs_temp`
--

LOCK TABLES `electeurs_temp` WRITE;
/*!40000 ALTER TABLE `electeurs_temp` DISABLE KEYS */;
/*!40000 ALTER TABLE `electeurs_temp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gestionperiode`
--

DROP TABLE IF EXISTS `gestionperiode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gestionperiode` (
  `id_admin` int NOT NULL,
  `id_periode` int NOT NULL,
  PRIMARY KEY (`id_admin`,`id_periode`),
  KEY `id_periode` (`id_periode`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gestionperiode`
--

LOCK TABLES `gestionperiode` WRITE;
/*!40000 ALTER TABLE `gestionperiode` DISABLE KEYS */;
INSERT INTO `gestionperiode` VALUES (1,1);
/*!40000 ALTER TABLE `gestionperiode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parrainage`
--

DROP TABLE IF EXISTS `parrainage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parrainage` (
  `id_parrainage` int NOT NULL AUTO_INCREMENT,
  `id_electeur` int NOT NULL,
  `id_candidat` int NOT NULL,
  `date_parrainage` datetime NOT NULL,
  `statut_parrainage` enum('validé','en_attente','refusé') DEFAULT 'en_attente',
  PRIMARY KEY (`id_parrainage`),
  KEY `id_electeur` (`id_electeur`),
  KEY `id_candidat` (`id_candidat`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parrainage`
--

LOCK TABLES `parrainage` WRITE;
/*!40000 ALTER TABLE `parrainage` DISABLE KEYS */;
INSERT INTO `parrainage` VALUES (1,1,1,'2025-02-10 22:53:47','validé'),(2,2,2,'2025-02-10 22:53:57','en_attente');
/*!40000 ALTER TABLE `parrainage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parrainageperiode`
--

DROP TABLE IF EXISTS `parrainageperiode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parrainageperiode` (
  `id_parrainage` int NOT NULL,
  `id_periode` int NOT NULL,
  PRIMARY KEY (`id_parrainage`,`id_periode`),
  KEY `id_periode` (`id_periode`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parrainageperiode`
--

LOCK TABLES `parrainageperiode` WRITE;
/*!40000 ALTER TABLE `parrainageperiode` DISABLE KEYS */;
INSERT INTO `parrainageperiode` VALUES (1,1);
/*!40000 ALTER TABLE `parrainageperiode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodeparrainage`
--

DROP TABLE IF EXISTS `periodeparrainage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periodeparrainage` (
  `id_periode` int NOT NULL AUTO_INCREMENT,
  `date_debut` datetime NOT NULL,
  `date_fin` datetime NOT NULL,
  `statut_periode` enum('ouvert','fermé') DEFAULT 'fermé',
  PRIMARY KEY (`id_periode`),
  CONSTRAINT `chk_dates` CHECK ((`date_debut` < `date_fin`))
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodeparrainage`
--

LOCK TABLES `periodeparrainage` WRITE;
/*!40000 ALTER TABLE `periodeparrainage` DISABLE KEYS */;
INSERT INTO `periodeparrainage` VALUES (1,'2025-01-01 00:00:00','2025-01-31 23:59:59','ouvert'),(2,'2025-01-01 00:00:00','2025-01-31 23:59:59','ouvert'),(3,'2025-02-01 00:00:00','2025-02-28 23:59:59','fermé');
/*!40000 ALTER TABLE `periodeparrainage` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-02 20:52:13
