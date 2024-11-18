<?php

/*
 * Complete the 'marsExploration' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function marsExploration($s) {
    $count = 0;
    $n = strlen($s);
    
    for ($i = 0; $i < $n; $i++) {
        $expectedChar = "SOS"[$i % 3];
       
        if ($s[$i] !== $expectedChar) {
            $count++;
        }
    }
    
    return $count; 

}

$fptr = fopen(getenv("OUTPUT_PATH"), "w");

$s = rtrim(fgets(STDIN), "\r\n");

$result = marsExploration($s);

fwrite($fptr, $result . "\n");

fclose($fptr);
