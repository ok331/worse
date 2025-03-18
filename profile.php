<?php
header('Content-Type: text/html; charset=utf-8');

$username = $_GET['username'] ?? '';
if (empty($username)) {
    header('Location: /');
    exit;
}

$username = preg_replace('/[^a-zA-Z0-9_-]/', '', $username);

$profileFile = $username . '.html';
if (!file_exists($profileFile)) {
    header('HTTP/1.0 404 Not Found');
    echo '<!DOCTYPE html>
    <html>
    <head>
        <title>Profile Not Found</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <div class="container">
            <h1 class="metallic-text">Profile Not Found</h1>
            <p>The requested profile does not exist.</p>
            <a href="/" class="feature-card" style="display: inline-block; text-decoration: none; margin-top: 20px;">
                Return Home
            </a>
        </div>
    </body>
    </html>';
    exit;
}

readfile($profileFile);
?> 
