<?php
// check for form submission - if it doesn’t exist then send back to contact form
if (!isset($_POST["save"]) || $_POST["save"] != ”contact”) {
    header(“Location: contact.html”); exit;
}
// get the posted data
$name = $_POST["contact_name"];
$email_address = $_POST["contact_email"];
$message = $_POST["contact_message"];
// check that a name was entered
if (emptyempty($name))
    $error = ”You must enter your name.”;
// check that an email address was entered
elseif (emptyempty($email_address))
    $error = ”You must enter your email address.”;
// check for a valid email address
elseif (!preg_match(“/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/”, $email_address))
    $error = ”You must enter a valid email address.”;
// check that a message was entered
elseif (emptyempty($message))
    $error = ”You must enter a message.”;
// check if an error was found - if there was, send the user back to the form
if (isset($error)) {
    header(“Location: contact.html?e=”.urlencode($error)); exit;
}
// write the email content
$email_content = ”Name: $name\n”;
$email_content .= ”Email Address: $email_address\n”;
$email_content .= ”Message:\n\n$message”;
// send the email
mail (“rdrishi12@gmail.com”, ”New Contact Message”, $email_content);
// send the user back to the form
header(“Location: contact.html?s=”.urlencode(“Thank you for your message.”)); exit;
?>