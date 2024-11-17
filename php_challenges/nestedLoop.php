<?php
function imprimirPiramide($filas) {
    for ($i = 1; $i <= $filas; $i++) {
        // Espacios en blanco
        echo str_repeat(' ', $filas - $i);
        // Asteriscos
        echo str_repeat('*', 2 * $i - 1);
        echo "\n";
    }
}

// Ejemplo
$filas = 5;
imprimirPiramide($filas);
?>