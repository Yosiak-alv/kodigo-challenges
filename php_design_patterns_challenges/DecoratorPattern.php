<?php

interface Character {
    public function getDescription(): string;
    public function getPower(): int;
}

abstract class WeaponDecorator implements Character {
    protected $character;

    public function __construct(Character $character) {
        $this->character = $character;
    }

    public function getDescription(): string {
        return $this->character->getDescription();
    }

    public function getPower(): int {
        return $this->character->getPower();
    }
}

class Warrior implements Character {
    public function getDescription(): string {
        return "Warrior";
    }

    public function getPower(): int {
        return 50; // Base form
    }
}

class Mage implements Character {
    public function getDescription(): string {
        return "Mage";
    }

    public function getPower(): int {
        return 40; // Base form
    }
}

class Sword extends WeaponDecorator {
    public function getDescription(): string {
        return $this->character->getDescription() . " with a Sword";
    }

    public function getPower(): int {
        return $this->character->getPower() + 30; 
    }
}

class Bow extends WeaponDecorator {
    public function getDescription(): string {
        return $this->character->getDescription() . " with a Bow";
    }

    public function getPower(): int {
        return $this->character->getPower() + 20;
    }
}

class Staff extends WeaponDecorator {
    public function getDescription(): string {
        return $this->character->getDescription() . " with a Magic Staff";
    }

    public function getPower(): int {
        return $this->character->getPower() + 50;
    }
}

try {
    $warrior = new Warrior();
    $mage = new Mage();

    // Equip weapons
    $warriorWithSword = new Sword($warrior);
    $mageWithStaffAndBow = new Bow(new Staff($mage));

	//stats
    echo $warriorWithSword->getDescription() . " has power: " . $warriorWithSword->getPower() . "\n";
    echo $mageWithStaffAndBow->getDescription() . " has power: " . $mageWithStaffAndBow->getPower() . "\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}