<?php
// Función para calcular la frecuencia de caracteres en una cadena
function frecuenciaCaracteres($cadena) {
    $frecuencia = [];
    // Recorrer cada carácter de la cadena
    for ($i = 0; $i < strlen($cadena); $i++) {
        $caracter = $cadena[$i];
        // Incrementar la frecuencia del carácter si ya existe en el array
        if (isset($frecuencia[$caracter])) {
            $frecuencia[$caracter]++;
        } else {
            $frecuencia[$caracter] = 1; // Inicializar la frecuencia
        }
    }
    return $frecuencia;
}

print_r(frecuenciaCaracteres("hola mundo")); 
?>