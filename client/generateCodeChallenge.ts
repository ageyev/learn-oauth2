import {crypto} from "https://deno.land/std@0.187.0/crypto/crypto.ts";
import {encode as base64urlEncode} from "https://deno.land/std@0.153.0/encoding/base64url.ts";

// see:
// https://deno.land/std@0.187.0/crypto/to_hash_string.ts?s=toHashString#example_0

const generateCodeChallenge = async (codeVerifier: string) => {
    const hash = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(codeVerifier) //
    );
    return base64urlEncode(hash);
}

// console.log(await generateCodeChallenge('TIxkQuR0wc0Irn5Y-FMQr_gZom8NIEmaGq3Q4D_z-e3pFyG6eFKugLXnGw'));

export default generateCodeChallenge;