<?php
function insertionSort(&$array) {
    $n = count($array);
    for ($i = 1; $i < $n; $i++) {
        $key = $array[$i];
        $j = $i - 1;

        // Mover elementos que son mayores que la clave
        while ($j >= 0 && strcasecmp($array[$j], $key) > 0) {
            $array[$j + 1] = $array[$j];
            $j--;
        }
        $array[$j + 1] = $key;
    }
}

$list = ["Carlos", "Ana", "Beatriz", "Pedro", "Luisa"];
echo "- Lista original: " . implode(", ", $list) . " ";

insertionSort($list);
echo "- Lista ordenada (alfabéticamente): " . implode(", ", $list);
?>