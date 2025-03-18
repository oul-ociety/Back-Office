<?php
 session_start();
 require 'connexion.php';
 
 $error = '';
 
 if ($_SERVER['REQUEST_METHOD'] == 'POST') {
     $username = trim($_POST['username']);
     $password = trim($_POST['password']);
 
     if (empty($username) || empty($password)) {
         $error = "Veuillez remplir tous les champs.";
     } else {
         try {
             $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
             $stmt->execute([$username]);
             $user = $stmt->fetch();
 
             if ($user && password_verify($password, $user['password'])) {
                 $_SESSION['user_id'] = $user['id'];
                 $_SESSION['role'] = $user['role'];
                 header("Location: dashboard.php");
                 exit();
             } else {
                 $error = "Identifiants incorrects.";
             }
         } catch (PDOException $e) {
             $error = "Erreur SQL : " . $e->getMessage();
         }
     }
 }
 ?>
 
 <!DOCTYPE html>
 <html lang="fr">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Connexion</title>
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
 </head>
 <body class="d-flex justify-content-center align-items-center vh-100">
     <div class="card p-4 shadow-lg" style="width: 400px;">
         <h3 class="text-center">Connexion</h3>
         <?php if (!empty($error)): ?>
             <div class="alert alert-danger"><?php echo $error; ?></div>
         <?php endif; ?>
         <form method="POST">
             <div class="mb-3">
                 <label class="form-label">Nom d'utilisateur</label>
                 <input type="text" name="username" class="form-control" required>
             </div>
             <div class="mb-3">
                 <label class="form-label">Mot de passe</label>
                 <input type="password" name="password" class="form-control" required>
             </div>
             <button type="submit" class="btn btn-primary w-100">Se connecter</button>
         </form>
     </div>
 </body>
 </html>