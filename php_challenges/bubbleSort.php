<?php
function bubbleSortDesc(&$array) {
    $n = count($array);
    for ($i = 0; $i < $n - 1; $i++) {
        for ($j = 0; $j < $n - $i - 1; $j++) {
            if ($array[$j] < $array[$j + 1]) {
                // Intercambiar valores
                $temp = $array[$j];
                $array[$j] = $array[$j + 1];
                $array[$j + 1] = $temp;
            }
        }
    }
}

$list = [3, -1, 5, 7, -2, 3, 0];
echo "Lista original: " . implode(", ", $list) . PHP_EOL;

bubbleSortDesc($list);
echo "Lista ordenada (descendente): " . implode(", ", $list) . PHP_EOL;
?>
