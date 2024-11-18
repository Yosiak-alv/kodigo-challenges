<?php

/*
 * Complete the 'minimumNumber' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. STRING password
 */

function minimumNumber($n, $password) {
    // Return the minimum number of characters to make the password strong
    $numbers = "0123456789";
    $lower_case = "abcdefghijklmnopqrstuvwxyz";
    $upper_case = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $special_characters = "!@#$%^&*()-+";

    $has_digit = false;
    $has_lower = false;
    $has_upper = false;
    $has_special = false;

    for ($i = 0; $i < $n; $i++) {
        if (strpos($numbers, $password[$i]) !== false) {
            $has_digit = true;
        }
        if (strpos($lower_case, $password[$i]) !== false) {
            $has_lower = true;
        }
        if (strpos($upper_case, $password[$i]) !== false) {
            $has_upper = true;
        }
        if (strpos($special_characters, $password[$i]) !== false) {
            $has_special = true;
        }
    }
    $missing_types = 0;
    if (!$has_digit) {
        $missing_types++;
    }
    if (!$has_lower) {
        $missing_types++;
    }
    if (!$has_upper) {
        $missing_types++;
    }
    if (!$has_special) {
        $missing_types++;
    }
    $required_length = 6 - $n;
    $missing_types = max($missing_types, $required_length);

    return $missing_types;
}

$fptr = fopen(getenv("OUTPUT_PATH"), "w");

$n = intval(trim(fgets(STDIN)));

$password = rtrim(fgets(STDIN), "\r\n");

$answer = minimumNumber($n, $password);

fwrite($fptr, $answer . "\n");

fclose($fptr);
