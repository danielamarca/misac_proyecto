-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: proyecto1
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

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
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` varchar(255) NOT NULL,
  `cod_cliente` varchar(255) DEFAULT NULL,
  `nombres` varchar(255) DEFAULT NULL,
  `apellidoPaterno` varchar(255) DEFAULT NULL,
  `apellidoMaterno` varchar(255) DEFAULT NULL,
  `nombreCompleto` varchar(255) DEFAULT NULL,
  `ci` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombreCompleto` (`nombreCompleto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES ('96TQx_cGjeJO5nFBq-IhL','C-001','PABLO','BUENO','MAMANI','PABLO BUENO MAMANI','7278801 OR','ORURO, CALLE 7 ENTRE H Y Q','76144824','pablo123bueno@gmail.com','2024-01-12 14:22:56','2024-01-12 14:22:56');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cotizacions`
--

DROP TABLE IF EXISTS `cotizacions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cotizacions` (
  `id` varchar(255) NOT NULL,
  `id_cotizacion` varchar(255) DEFAULT NULL,
  `id_venta` varchar(255) DEFAULT NULL,
  `fechaCreacion` datetime DEFAULT NULL,
  `fechaValidez` datetime DEFAULT NULL,
  `monto` float DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_cotizacion` (`id_cotizacion`),
  KEY `id_venta` (`id_venta`),
  CONSTRAINT `cotizacions_ibfk_1` FOREIGN KEY (`id_cotizacion`) REFERENCES `cotizacions` (`id`),
  CONSTRAINT `cotizacions_ibfk_2` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cotizacions`
--

LOCK TABLES `cotizacions` WRITE;
/*!40000 ALTER TABLE `cotizacions` DISABLE KEYS */;
/*!40000 ALTER TABLE `cotizacions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleadoTecnicos`
--

DROP TABLE IF EXISTS `empleadoTecnicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleadoTecnicos` (
  `id` varchar(255) NOT NULL,
  `id_empleado` varchar(255) DEFAULT NULL,
  `especialidad` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_empleado` (`id_empleado`),
  CONSTRAINT `empleadoTecnicos_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleadoTecnicos`
--

LOCK TABLES `empleadoTecnicos` WRITE;
/*!40000 ALTER TABLE `empleadoTecnicos` DISABLE KEYS */;
/*!40000 ALTER TABLE `empleadoTecnicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `id` varchar(255) NOT NULL,
  `rol` varchar(255) DEFAULT NULL,
  `salario` float DEFAULT NULL,
  `nombres` varchar(255) DEFAULT NULL,
  `apellidoPaterno` varchar(255) DEFAULT NULL,
  `apellidoMaterno` varchar(255) DEFAULT NULL,
  `nombreCompleto` varchar(255) DEFAULT NULL,
  `ci` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombreCompleto` (`nombreCompleto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES ('IBtpezRmaeuv0ddv5CO-F','GERENTE',NULL,'PABLO','BUENO',NULL,'PABLO BUENO','723004333','ZONA CENTRAL, MERCADO CAMPERO','76144825','Dan123@gmail.com','2024-01-12 14:24:01','2024-01-12 14:24:01');
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipoCategoria`
--

DROP TABLE IF EXISTS `equipoCategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipoCategoria` (
  `id` varchar(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipoCategoria`
--

LOCK TABLES `equipoCategoria` WRITE;
/*!40000 ALTER TABLE `equipoCategoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipoCategoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipoCodigos`
--

DROP TABLE IF EXISTS `equipoCodigos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipoCodigos` (
  `id` varchar(255) NOT NULL,
  `id_equipo` varchar(255) DEFAULT NULL,
  `id_servicio` varchar(255) DEFAULT NULL,
  `id_venta` varchar(255) DEFAULT NULL,
  `codigo` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_equipo` (`id_equipo`),
  CONSTRAINT `equipoCodigos_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipoCodigos`
--

LOCK TABLES `equipoCodigos` WRITE;
/*!40000 ALTER TABLE `equipoCodigos` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipoCodigos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipoFotos`
--

DROP TABLE IF EXISTS `equipoFotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipoFotos` (
  `id` varchar(255) NOT NULL,
  `id_equipo` varchar(255) DEFAULT NULL,
  `archivo` blob,
  `formato` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_equipo` (`id_equipo`),
  CONSTRAINT `equipoFotos_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipoFotos`
--

LOCK TABLES `equipoFotos` WRITE;
/*!40000 ALTER TABLE `equipoFotos` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipoFotos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipos`
--

DROP TABLE IF EXISTS `equipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipos` (
  `id` varchar(255) NOT NULL,
  `id_proveedor` varchar(255) DEFAULT NULL,
  `id_equipo_categoria` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_proveedor` (`id_proveedor`),
  KEY `id_equipo_categoria` (`id_equipo_categoria`),
  CONSTRAINT `equipos_ibfk_1` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `equipos_ibfk_2` FOREIGN KEY (`id_equipo_categoria`) REFERENCES `equipoCategoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos`
--

LOCK TABLES `equipos` WRITE;
/*!40000 ALTER TABLE `equipos` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `herramienta`
--

DROP TABLE IF EXISTS `herramienta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `herramienta` (
  `id` varchar(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `herramienta`
--

LOCK TABLES `herramienta` WRITE;
/*!40000 ALTER TABLE `herramienta` DISABLE KEYS */;
/*!40000 ALTER TABLE `herramienta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `herramientaFotos`
--

DROP TABLE IF EXISTS `herramientaFotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `herramientaFotos` (
  `id` varchar(255) NOT NULL,
  `id_herramienta` varchar(255) DEFAULT NULL,
  `archivo` blob,
  `formato` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_herramienta` (`id_herramienta`),
  CONSTRAINT `herramientaFotos_ibfk_1` FOREIGN KEY (`id_herramienta`) REFERENCES `herramienta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `herramientaFotos`
--

LOCK TABLES `herramientaFotos` WRITE;
/*!40000 ALTER TABLE `herramientaFotos` DISABLE KEYS */;
/*!40000 ALTER TABLE `herramientaFotos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insumoFotos`
--

DROP TABLE IF EXISTS `insumoFotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insumoFotos` (
  `id` varchar(255) NOT NULL,
  `id_insumo` varchar(255) DEFAULT NULL,
  `archivo` blob,
  `formato` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_insumo` (`id_insumo`),
  CONSTRAINT `insumoFotos_ibfk_1` FOREIGN KEY (`id_insumo`) REFERENCES `insumos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insumoFotos`
--

LOCK TABLES `insumoFotos` WRITE;
/*!40000 ALTER TABLE `insumoFotos` DISABLE KEYS */;
/*!40000 ALTER TABLE `insumoFotos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insumos`
--

DROP TABLE IF EXISTS `insumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insumos` (
  `id` varchar(255) NOT NULL,
  `id_proveedor` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `costo` float DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_proveedor` (`id_proveedor`),
  CONSTRAINT `insumos_ibfk_1` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insumos`
--

LOCK TABLES `insumos` WRITE;
/*!40000 ALTER TABLE `insumos` DISABLE KEYS */;
/*!40000 ALTER TABLE `insumos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedors`
--

DROP TABLE IF EXISTS `proveedors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedors` (
  `id` varchar(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `contacto` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedors`
--

LOCK TABLES `proveedors` WRITE;
/*!40000 ALTER TABLE `proveedors` DISABLE KEYS */;
/*!40000 ALTER TABLE `proveedors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicioEquipos`
--

DROP TABLE IF EXISTS `servicioEquipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicioEquipos` (
  `id` varchar(255) NOT NULL,
  `id_equipo` varchar(255) DEFAULT NULL,
  `id_servicio` varchar(255) DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `unidad` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_equipo` (`id_equipo`),
  KEY `id_servicio` (`id_servicio`),
  CONSTRAINT `servicioEquipos_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `servicioEquipos_ibfk_2` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicioEquipos`
--

LOCK TABLES `servicioEquipos` WRITE;
/*!40000 ALTER TABLE `servicioEquipos` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicioEquipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicioHerramienta`
--

DROP TABLE IF EXISTS `servicioHerramienta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicioHerramienta` (
  `id` varchar(255) NOT NULL,
  `id_herramienta` varchar(255) DEFAULT NULL,
  `id_servicio` varchar(255) DEFAULT NULL,
  `costo` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_herramienta` (`id_herramienta`),
  KEY `id_servicio` (`id_servicio`),
  CONSTRAINT `servicioHerramienta_ibfk_1` FOREIGN KEY (`id_herramienta`) REFERENCES `herramienta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `servicioHerramienta_ibfk_2` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicioHerramienta`
--

LOCK TABLES `servicioHerramienta` WRITE;
/*!40000 ALTER TABLE `servicioHerramienta` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicioHerramienta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicioInspeccions`
--

DROP TABLE IF EXISTS `servicioInspeccions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicioInspeccions` (
  `id` varchar(255) NOT NULL,
  `id_servicio` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `monto` float DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_servicio` (`id_servicio`),
  CONSTRAINT `servicioInspeccions_ibfk_1` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicioInspeccions`
--

LOCK TABLES `servicioInspeccions` WRITE;
/*!40000 ALTER TABLE `servicioInspeccions` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicioInspeccions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicioInsumos`
--

DROP TABLE IF EXISTS `servicioInsumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicioInsumos` (
  `id` varchar(255) NOT NULL,
  `id_insumo` varchar(255) DEFAULT NULL,
  `id_servicio` varchar(255) DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `unidad` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_insumo` (`id_insumo`),
  KEY `id_servicio` (`id_servicio`),
  CONSTRAINT `servicioInsumos_ibfk_1` FOREIGN KEY (`id_insumo`) REFERENCES `insumos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `servicioInsumos_ibfk_2` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicioInsumos`
--

LOCK TABLES `servicioInsumos` WRITE;
/*!40000 ALTER TABLE `servicioInsumos` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicioInsumos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicioTipos`
--

DROP TABLE IF EXISTS `servicioTipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicioTipos` (
  `id` varchar(255) NOT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicioTipos`
--

LOCK TABLES `servicioTipos` WRITE;
/*!40000 ALTER TABLE `servicioTipos` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicioTipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios` (
  `id` varchar(255) NOT NULL,
  `id_servicio_tipo` varchar(255) DEFAULT NULL,
  `id_cliente` varchar(255) DEFAULT NULL,
  `id_tecnico` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `fechaProgramada` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_servicio_tipo` (`id_servicio_tipo`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_tecnico` (`id_tecnico`),
  CONSTRAINT `servicios_ibfk_1` FOREIGN KEY (`id_servicio_tipo`) REFERENCES `servicioTipos` (`id`),
  CONSTRAINT `servicios_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `servicios_ibfk_3` FOREIGN KEY (`id_tecnico`) REFERENCES `empleadoTecnicos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tareaFotos`
--

DROP TABLE IF EXISTS `tareaFotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tareaFotos` (
  `id` varchar(255) NOT NULL,
  `id_tarea` varchar(255) DEFAULT NULL,
  `archivo` blob,
  `formato` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tarea` (`id_tarea`),
  CONSTRAINT `tareaFotos_ibfk_1` FOREIGN KEY (`id_tarea`) REFERENCES `tareas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tareaFotos`
--

LOCK TABLES `tareaFotos` WRITE;
/*!40000 ALTER TABLE `tareaFotos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tareaFotos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tareas`
--

DROP TABLE IF EXISTS `tareas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tareas` (
  `id` varchar(255) NOT NULL,
  `id_servicio` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` tinyint DEFAULT NULL,
  `comentarios` varchar(255) DEFAULT NULL,
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_servicio` (`id_servicio`),
  CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tareas`
--

LOCK TABLES `tareas` WRITE;
/*!40000 ALTER TABLE `tareas` DISABLE KEYS */;
/*!40000 ALTER TABLE `tareas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` varchar(255) NOT NULL,
  `id_empleado` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `privilegio` int DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `id_empleado` (`id_empleado`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('XT04wTUECG8NkdbYb7rHY','IBtpezRmaeuv0ddv5CO-F','daniel',1,'$2a$05$xbT/AmhQcf4tSOnaqgSDU.FbcH4gTuxvJ7QE/3ogaKmr.BhqbvGXu','2024-01-12 14:24:01','2024-01-12 14:24:01');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `id` varchar(255) NOT NULL,
  `id_cliente` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `total` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventaEquipos`
--

DROP TABLE IF EXISTS `ventaEquipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventaEquipos` (
  `id` varchar(255) NOT NULL,
  `id_equipo` varchar(255) DEFAULT NULL,
  `id_venta` varchar(255) DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `unidad` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_equipo` (`id_equipo`),
  KEY `id_venta` (`id_venta`),
  CONSTRAINT `ventaEquipos_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ventaEquipos_ibfk_2` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventaEquipos`
--

LOCK TABLES `ventaEquipos` WRITE;
/*!40000 ALTER TABLE `ventaEquipos` DISABLE KEYS */;
/*!40000 ALTER TABLE `ventaEquipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventaInsumos`
--

DROP TABLE IF EXISTS `ventaInsumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventaInsumos` (
  `id` varchar(255) NOT NULL,
  `id_insumo` varchar(255) DEFAULT NULL,
  `id_venta` varchar(255) DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `unidad` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_insumo` (`id_insumo`),
  KEY `id_venta` (`id_venta`),
  CONSTRAINT `ventaInsumos_ibfk_1` FOREIGN KEY (`id_insumo`) REFERENCES `insumos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ventaInsumos_ibfk_2` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventaInsumos`
--

LOCK TABLES `ventaInsumos` WRITE;
/*!40000 ALTER TABLE `ventaInsumos` DISABLE KEYS */;
/*!40000 ALTER TABLE `ventaInsumos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventaPagos`
--

DROP TABLE IF EXISTS `ventaPagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventaPagos` (
  `id` varchar(255) NOT NULL,
  `id_venta` varchar(255) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `monto` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_venta` (`id_venta`),
  CONSTRAINT `ventaPagos_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventaPagos`
--

LOCK TABLES `ventaPagos` WRITE;
/*!40000 ALTER TABLE `ventaPagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `ventaPagos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-12 20:23:20
