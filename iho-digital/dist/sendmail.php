<?php
// File: public/sendmail.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get JSON data from the request
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    // If JSON decoding fails, try standard $_POST (fallback)
    $name = $data->name ?? $_POST["name"] ?? "";
    $email = $data->email ?? $_POST["email"] ?? "";
    $message = $data->message ?? $_POST["message"] ?? "";
    $service = $data->service ?? $_POST["service"] ?? "General Inquiry";
    $subject = $data->subject ?? "New Inquiry from Website";

    // Validate
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(["message" => "Please fill in all required fields."]);
        exit;
    }

    // Email Config
    $recipient = "ihodigital.com@gmail.com";
    
    // Email Headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $name <$email>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";

    // Email Body
    $email_body = "
    <html>
    <head>
        <title>$subject</title>
    </head>
    <body style='font-family: Arial, sans-serif;'>
        <h2>New Message from IHO Digital Website</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Service:</strong> $service</p>
        <br>
        <p><strong>Message:</strong><br>$message</p>
    </body>
    </html>
    ";

    // Send
    if (mail($recipient, $subject, $email_body, $headers)) {
        http_response_code(200);
        echo json_encode(["message" => "Message sent successfully!"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to send email."]);
    }
} else {
    http_response_code(403);
    echo json_encode(["message" => "Forbidden"]);
}
?>