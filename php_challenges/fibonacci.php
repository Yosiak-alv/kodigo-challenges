<?php
// Función para generar los primeros n términos de la serie Fibonacci
function generarFibonacci($n) {
    // Validar que n sea un entero positivo
    if ($n <= 0) {
        return [];
    }
    $fibonacci = [0]; // El primer término es siempre 0
    if ($n > 1) {
        $fibonacci[] = 1; // El segundo término es siempre 1
        // Generar la serie sumando los dos últimos números
        for ($i = 2; $i < $n; $i++) {
            $fibonacci[] = $fibonacci[$i - 1] + $fibonacci[$i - 2];
        }
    }
    return $fibonacci;
}

print_r(generarFibonacci(10));
?>