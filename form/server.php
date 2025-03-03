<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $jsonData = file_get_contents("php://input");
    $data = json_decode($jsonData, true);

    if ($data) {
        echo json_encode(["message" => "Uspešno ste poslali podatke!"]);
    } else {
        echo json_encode(["error" => "Neispravni podaci"]);
    }
} else {
    echo json_encode(["error" => "Dozvoljeni su samo POST zahtevi"]);
}
?>
