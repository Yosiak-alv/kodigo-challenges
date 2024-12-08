<?php
class Book
{
    private $id;
    private $title;
    private $author;
    private $category;
    private $isAvailable;

    /**
     * @param $id
     * @param $title
     * @param $author
     * @param $category
     * @param $state
     */
    public function __construct($id, $title, $author, $category, $isAvailable)
    {
        $this->id = $id;
        $this->title = $title;
        $this->author = $author;
        $this->category = $category;
        $this->isAvailable = $isAvailable;
    }

    public function toJson()
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'author' => $this->author,
            'category' => $this->category,
            'isAvailable' => $this->isAvailable
        ];
    }

    public function getPropertySearch($key) {
        $properties = [
            'title' => $this->title,
            'author' => $this->author,
            'category' => $this->category
        ];
        return isset($properties[$key]) ? $properties[$key] : null;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @return mixed
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @return mixed
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * @return mixed
     */
    public function getIsAvailable()
    {
        return $this->isAvailable;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @param mixed $author
     */
    public function setAuthor($author)
    {
        $this->author = $author;
    }

    /**
     * @param mixed $category
     */
    public function setCategory($category)
    {
        $this->category = $category;
    }

    /**
     * @param mixed $isAvailable
     */
    public function setIsAvailable($isAvailable)
    {
        $this->isAvailable = $isAvailable;
    }


}