<?php
function mergeSort($array) {
    if (count($array) <= 1) {
        return $array;
    }

    $mid = floor(count($array) / 2);
    $left = mergeSort(array_slice($array, 0, $mid));
    $right = mergeSort(array_slice($array, $mid));

    return merge($left, $right);
}

function merge($left, $right) {
    $result = [];
    while (count($left) > 0 && count($right) > 0) {
        if (strcasecmp($left[0], $right[0]) <= 0) {
            $result[] = array_shift($left);
        } else {
            $result[] = array_shift($right);
        }
    }

    return array_merge($result, $left, $right);
}

$list = ["manzana", "banana", "naranja", "uva", "limón"];
echo "- Lista original: " . implode(", ", $list) . " ";

$sortedList = mergeSort($list);
echo "- Lista ordenada (alfabéticamente): " . implode(", ", $sortedList);
?>
