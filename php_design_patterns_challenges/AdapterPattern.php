<?php

interface Windows10FileHandler {
    public function openFile(string $fileType);
}

class Windows10Handler implements Windows10FileHandler {
    public function openFile(string $fileType) {
        echo "Opening $fileType file in Windows 10...\n";
    }
}

class Windows7Handler {
    public function openOldFile(string $fileType) {
        echo "Opening $fileType file in Windows 7 format...\n";
    }
}

class Windows7ToWindows10Adapter implements Windows10FileHandler {
    private $windows7Handler;

    public function __construct(Windows7Handler $windows7Handler) {
        $this->windows7Handler = $windows7Handler;
    }

    public function openFile(string $fileType) {
        $this->windows7Handler->openOldFile($fileType);
    }
}

try {
    $files = ['Word', 'Excel', 'PowerPoint'];

    $windows10Handler = new Windows10Handler();

    $windows7Handler = new Windows7Handler();
    $adapter = new Windows7ToWindows10Adapter($windows7Handler);

    foreach ($files as $file) {
        if (rand(0, 1)) {
            // Using Windows 10 handler for compatible files
            echo "[Windows 10]: ";
            $windows10Handler->openFile($file);
        } else {
            // Using the adapter for legacy Windows 7 files
            echo "[Adapter]: ";
            $adapter->openFile($file);
        }
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}