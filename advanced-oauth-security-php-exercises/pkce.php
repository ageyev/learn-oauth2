<?php

// https://www.udemy.com/course/advanced-oauth-security/learn/quiz/5728698
// Write a PHP function here to calculate the code challenge given the code verifier
// Helpful functions: hash, base64_encode

function calculate_code_challenge($code_verifier)
{

    // https://www.php.net/manual/en/function.hash.php
    $hash = hash('sha256', $code_verifier, true); //

    // https://www.php.net/manual/en/function.base64-encode.php
    $base64str = base64_encode($hash);

    //  replace substrings
    //  strtr(string $string, string $from, string $to): string
    // and strip "=" (padding) from the end of a string
    return rtrim(strtr($base64str, '+/', '-_'), '=');
}
