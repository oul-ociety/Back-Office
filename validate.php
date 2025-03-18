<?php
session_start();
require 'connexion.php';

if ($_SESSION['role'] !== 'admin') {
    die("Accès refusé.");
}

$pdo->beginTransaction();

$pdo->exec("DELETE FROM electeurs_erreurs");
$stmt = $pdo->query("SELECT * FROM electeurs_temp");
while ($row = $stmt->fetch()) {
    if (!preg_match('/^\d{13}$/', $row['cin']) || !preg_match('/^\d{10}$/', $row['numero_electeur'])) {
        $pdo->prepare("INSERT INTO electeurs_erreurs (cin, numero_electeur, erreur) VALUES (?, ?, 'Format invalide')")->execute([$row['cin'], $row['numero_electeur']]);
    }
}

$erreur_count = $pdo->query("SELECT COUNT(*) FROM electeurs_erreurs")->fetchColumn();
if ($erreur_count > 0) {
    echo "<p class='text-danger'>Des erreurs ont été détectées.</p>";
} else {
    $pdo->exec("INSERT INTO electeurs SELECT * FROM electeurs_temp");
    $pdo->exec("DELETE FROM electeurs_temp");
    $pdo->exec("UPDATE system_status SET EtatUploadElecteurs = FALSE");
    echo "<p class='text-success'>Importation validée.</p>";
}

$pdo->commit();
?>
