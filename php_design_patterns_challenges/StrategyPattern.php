<?php

// Strategy Interface
interface OutputStrategy {
    public function output(string $message): void;
}

class ConsoleOutput implements OutputStrategy {
    public function output(string $message): void {
        echo "[Console]: " . $message . "\n";
    }
}

class JsonOutput implements OutputStrategy {
    public function output(string $message): void {
        echo "[JSON]: " . json_encode(["message" => $message]) . "\n";
    }
}

class FileOutput implements OutputStrategy {
    private $filePath;

    public function __construct(string $filePath) {
        $this->filePath = $filePath;
    }

    public function output(string $message): void {
        file_put_contents($this->filePath, $message . PHP_EOL, FILE_APPEND);
        echo "[File]: Message written to {$this->filePath}\n";
    }
}

class MessageDisplayer {
    private $strategy;

    public function setStrategy(OutputStrategy $strategy): void {
        $this->strategy = $strategy;
    }

    public function display(string $message): void {
        if ($this->strategy) {
            $this->strategy->output($message);
        } else {
            throw new Exception("Output strategy not set!");
        }
    }
}

try {
    // Initialize strategies
    $consoleOutput = new ConsoleOutput();
    $jsonOutput = new JsonOutput();
    $fileOutput = new FileOutput("output.txt");

    // Create context
    $messageDisplayer = new MessageDisplayer();

    $message = "Hello, Strategy Pattern!";

    echo "Displaying messages in different formats:\n";

    // Console output
    $messageDisplayer->setStrategy($consoleOutput);
    $messageDisplayer->display($message);

    // JSON output
    $messageDisplayer->setStrategy($jsonOutput);
    $messageDisplayer->display($message);

    // File output
    $messageDisplayer->setStrategy($fileOutput);
    $messageDisplayer->display($message);

} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
