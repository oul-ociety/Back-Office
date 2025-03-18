<?php
session_start();
require 'connexion.php';

if ($_SESSION['role'] !== 'admin') {
    die("Accès refusé.");
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $checksum = $_POST['checksum'];
    $file = $_FILES['csv_file'];

    if ($file['error'] === UPLOAD_ERR_OK) {
        $file_tmp = $file['tmp_name'];
        $calculated_checksum = hash_file('sha256', $file_tmp);

        if ($checksum !== $calculated_checksum) {
            $error = "Checksum invalide.";
        } else {
            $handle = fopen($file_tmp, 'r');
            fgetcsv($handle);

            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                if (count($data) === 9) {
                    $nom = $data[1];
                    $prenom = $data[2];
                    $date_naissance = $data[3];
                    $lieu_naissance = $data[4];
                    $sexe = $data[5];
                    $cin = $data[6];
                    $numero_electeur = $data[7];
                    $bureau_vote = $data[8];

                    $stmt = $pdo->prepare("INSERT INTO electeurs_temp (cin, numero_electeur, nom, prenom, date_naissance, lieu_naissance, sexe, bureau_vote) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                    $stmt->execute([$cin, $numero_electeur, $nom, $prenom, $date_naissance, $lieu_naissance, $sexe, $bureau_vote]);
                } else {
                    echo "Erreur : La ligne ne contient pas 9 colonnes : " . implode(", ", $data) . "<br>";
                }
            }

            fclose($handle);
            $success = "Importation réussie.";
            header("Location: dashboard.php");
            exit();
        }
    } else {
        $error = "Erreur lors de l'upload.";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Importation CSV</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h2 class="text-center">Importer un fichier électoral</h2>
        <?php if(isset($error)) echo "<p class='text-danger'>$error</p>"; ?>
        <?php if(isset($success)) echo "<p class='text-success'>$success</p>"; ?>
        <form method="POST" enctype="multipart/form-data" class="card p-4 shadow-lg">
            <div class="mb-3">
                <label class="form-label">Checksum SHA256</label>
                <input type="text" name="checksum" class="form-control" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Fichier CSV</label>
                <input type="file" name="csv_file" class="form-control" accept=".csv" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Importer</button>
        </form>
    </div>
</body>
</html>