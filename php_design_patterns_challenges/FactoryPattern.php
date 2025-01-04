<?php

interface Character {
    public function attack();
    public function move();
}

class Skeleton implements Character {
    public function attack() {
        echo "The Skeleton MOB attacks you with arrows\n";
    }

    public function move() {
        echo "The Skeleton MOB moves quickly\n";
    }
}

class Zombie implements Character {
    public function attack() {
        echo "The Zombie MOB attacks with bites!\n";
    }

    public function move() {
        echo "The Zombie MOB moves slowly...\n";
    }
}

class CharacterFactory {
    public static function createCharacter(string $level): Character {
        switch (strtolower($level)) {
            case 'easy':
                return new Skeleton();
            case 'difficult':
                return new Zombie();
            default:
                throw new Exception("Unknown level: $level");
        }
    }
}

try {
    $level = 'easy';
    
    $character = CharacterFactory::createCharacter($level);

    $character->attack();
    $character->move();
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}