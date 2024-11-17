<?php
function sumaNumerosPares($array) {
    $suma = 0;
    foreach ($array as $numero) {
        if ($numero % 2 === 0) {
            $suma += $numero;
        }
    }
    return $suma;
}

// Ejemplo
$array = [1, 2, 3, 4, 5, 6];
$resultado = sumaNumerosPares($array);
echo "Suma de números pares: $resultado\n";
?>;