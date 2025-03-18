<?php
 $host = 'crossover.proxy.rlwy.net';
 $dbname = 'railway';
 $username = 'root';
 $password = 'zExKSJjenIwGHTEAUgPwCcTLjfsFzkln';
 $port = '29638'; // Ajoutez le port si nécessaire
 
 try {
     $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8", $username, $password);
     $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 } catch (PDOException $e) {
     die("Erreur de connexion : " . $e->getMessage());
 }
 ?>