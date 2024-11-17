<?php
// Función para verificar si una cadena es un palíndromo
function esPalindromo($cadena) {
    // Limpiar la cadena: eliminar espacios y convertir a minúsculas
    $cadenaLimpia = strtolower(str_replace(' ', '', $cadena));
    // Comparar la cadena limpia con su reverso
    return $cadenaLimpia === strrev($cadenaLimpia);
}

echo esPalindromo("Anita lava la tina") ? "Es palíndromo" : "No es palíndromo"; // Salida: Es palíndromo
?>