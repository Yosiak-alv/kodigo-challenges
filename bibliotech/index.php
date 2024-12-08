<?php

require_once 'models/Library.php';
require_once 'models/Book.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$library = new Library(
    [
        new Book(1, "Cien Años de Soledad", "Gabriel García Márquez", "Novela", true),
        new Book(2, "Don Quijote de la Mancha", "Miguel de Cervantes", "Clásico", true),
        new Book(3, "El Hobbit", "J.R.R. Tolkien", "Fantasía", false)
    ]
);

switch ($method) {
    case 'GET':
        if (isset($_GET['key']) && isset($_GET['value'])) {
            $key = $_GET['key']; // 'title', 'author', 'category'
            $value = $_GET['value'];
            echo json_encode($library->searchBook($key, $value));
        } else {
            echo json_encode($library->listBooks());
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['id'])) {
            echo json_encode($library->loanBook($input['id']));
        } else {
            echo json_encode(["error" => "Missing id parameter"]);
        }
        break;

    default:
        echo json_encode(["error" => "Method not allowed"]);
}
?>