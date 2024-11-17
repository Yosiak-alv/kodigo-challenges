<?php
function invertirLista($array) {
    return array_reverse($array);
}

// Ejemplo
$array = [1, 2, 3, 4, 5];
$resultado = invertirLista($array);
print_r($resultado);
?>