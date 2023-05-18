import {crypto} from "https://deno.land/std@0.187.0/crypto/crypto.ts";

// https://deno.land/x/crypto_random_string
// Deno module based on [crypto-random-string](https://github.com/sindresorhus/crypto-random-string).
// Useful for creating an identifier, slug, salt, PIN code, fixture, etc.
import {cryptoRandomString} from "https://deno.land/x/crypto_random_string@1.0.0/mod.ts";


const generateCodeVerifier = (length?: number) => {
    // Code verifier (secret) is random string 43-128 characters long
    length = length || 43;
    return cryptoRandomString({length: 10, type: 'url-safe'});
}



