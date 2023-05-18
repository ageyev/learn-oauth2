// https://deno.com/manual@main/basics/testing/assertions
// https://github.com/denoland/deno_std/blob/main/testing/asserts.ts
import {assert} from "https://deno.land/std@0.187.0/testing/asserts.ts";

// https://deno.com/manual@v1.33.3/node/npm_specifiers
// https://github.com/validatorjs/validator.js
import validator from "npm:validator";

import generateCodeVerifier from "../generateCodeVerifier.ts";

Deno.test("Code verifier should be base64url encoded string string >=43 and <=128 chars", () => {
    const codeVerifier = generateCodeVerifier();
    // console.log(codeVerifier);
    assert(codeVerifier.length >= 43 && codeVerifier.length <= 128);
    assert(validator.isBase64(
        codeVerifier,
        {urlSafe: true}
    ));
});

