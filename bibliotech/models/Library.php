<?php

require_once 'models/Book.php';
class Library
{
    private $books;

    // Constructor to initialize the Library with some default books
    public function __construct($books) {
        $this->books = $books;
    }
    public function listBooks() {
        $books = [];
        foreach ($this->books as $book) {
            $books[] = $book->toJson();
        }
        return $books;
    }

    public function searchBook($key, $value) {
        $results = [];
        foreach ($this->books as $book) {
            $propertyValue = $book->getPropertySearch($key);
            if (stripos($propertyValue, $value) !== false) {
                $results[] = $book->toJson();
            }
        }
        return $results;
    }

    // TODO CHECK WHY LOAN DOESNT UPDATE AVAILABILITY
    public function loanBook($id) {
        foreach ($this->books as $book) {
            if ($book->getId() == $id && $book->getIsAvailable()) {
                $book->setIsAvailable(false);
                return [
                    "message" => "Book loaned successfully",
                    "data" => $book->toJson()
                ];
            }
        }
        return [
            "error" => "Book not found or not available"
        ];
    }
}