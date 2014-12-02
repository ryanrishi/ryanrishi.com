<?php
$to = "ryan@ryanrishi.com";
$email = $_REQUEST['email'];
$subject = "New email from ryanrishi.com: " . $_REQUEST['subject'];
$message = $_REQUEST['message'];
$from = "From: " . $email;

mail($to, $subject, $message, $from);
header("Location: index.html");
?>
