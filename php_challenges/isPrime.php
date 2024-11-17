<?php
// Función para verificar si un número es primo
function esPrimo($numero) {
    // Un número menor o igual a 1 no es primo
    if ($numero <= 1) {
        return false;
    }
    // Comprobar divisores desde 2 hasta la raíz cuadrada del número
    for ($i = 2; $i <= sqrt($numero); $i++) {
        if ($numero % $i == 0) {
            return false; // Si encuentra un divisor, no es primo
        }
    }
    return true; // Si no encuentra divisores, es primo
}

// Ejemplo de uso
echo esPrimo(17) ? "Es primo" : "No es primo"; // Salida: Es primo
?>