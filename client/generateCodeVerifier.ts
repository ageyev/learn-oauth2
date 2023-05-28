import {crypto} from "https://deno.land/std@0.187.0/crypto/crypto.ts";
import {encode as base64urlEncode} from "https://deno.land/std@0.153.0/encoding/base64url.ts";

const generateCodeVerifier = (length?: number): string => {
    length = length || 43;
    if (length < 43 || length > 128) {
        new Error("Code verifier length should be from 43 to 128");
    }
    const arrayOfRandomNumbers = new Int8Array(length);
    crypto.getRandomValues(arrayOfRandomNumbers);
    return base64urlEncode(arrayOfRandomNumbers.buffer);
}

// console.log(generateCodeVerifier());

export default generateCodeVerifier;
