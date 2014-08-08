<?php
$to = "rdrishi12@gmail.com";
$email = $_REQUEST('email');
$subject = "New email from ryanrishi.com";
$message = $_REQUEST('message');
$headers .= "From: $email";

mail($to, $subject, $message, $headers);
header("Location: index.html");
?>