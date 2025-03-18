<?php
session_start();
require 'connexion.php';

// Vérifier si l'utilisateur est connecté et est un admin
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header("Location: login.php");
    exit();
}

$error = '';
$success = '';

// Valider les données
if (isset($_POST['validate'])) {
    try {
        $pdo->beginTransaction();

        // Vérifier les données dans la table temporaire
        $stmt = $pdo->query("SELECT * FROM electeurs_temp");
        while ($row = $stmt->fetch()) {
            // Vérifier le format de cin (13 chiffres) et numero_electeur (9 chiffres)
            if (!preg_match('/^\d{13}$/', $row['cin']) || !preg_match('/^\d{9}$/', $row['numero_electeur'])) {
                $pdo->prepare("INSERT INTO electeurs_erreurs (cin, numero_electeur, erreur) VALUES (?, ?, 'Format invalide')")->execute([$row['cin'], $row['numero_electeur']]);
            } else {
                $pdo->prepare("INSERT INTO electeurs (cin, numero_electeur, nom, prenom, date_naissance, lieu_naissance, sexe, statut, bureau_vote)
                               VALUES (?, ?, ?, ?, ?, ?, ?, 'validated', ?)")
                      ->execute([$row['cin'], $row['numero_electeur'], $row['nom'], $row['prenom'], $row['date_naissance'], $row['lieu_naissance'], $row['sexe'], $row['bureau_vote']]);
            }
        }

        // Compter les erreurs
        $erreur_count = $pdo->query("SELECT COUNT(*) FROM electeurs_erreurs")->fetchColumn();

        if ($erreur_count > 0) {
            $error = "Des erreurs ont été détectées. Veuillez les corriger avant de valider.";
        } else {
            $success = "Importation validée avec succès.";
        }

        // Supprimer les données temporaires après l'insertion
        $pdo->exec("DELETE FROM electeurs_temp");

        // Mettre à jour le statut du système
        $pdo->exec("UPDATE system_status SET EtatUploadElecteurs = FALSE");

        $pdo->commit();
    } catch (PDOException $e) {
        $pdo->rollBack();
        $error = "Erreur SQL : " . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tableau de bord</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h2 class="text-center">Tableau de bord</h2>
        <?php if (!empty($error)): ?>
            <div class="alert alert-danger"><?php echo $error; ?></div>
        <?php endif; ?>
        <?php if (!empty($success)): ?>
            <div class="alert alert-success"><?php echo $success; ?></div>
        <?php endif; ?>

        <!-- Lien vers la page d'upload -->
        <div class="mb-3">
            <a href="upload.php" class="btn btn-success">Importer un fichier CSV</a>
        </div>

        <!-- Formulaire pour valider les données -->
        <form method="POST">
            <button type="submit" name="validate" class="btn btn-primary">Valider les données</button>
        </form>

        <!-- Bouton de déconnexion -->
        <div class="mt-3">
            <a href="logout.php" class="btn btn-danger">Déconnexion</a>
        </div>
    </div>
</body>
</html>