// https://deno.com/manual@main/basics/testing/assertions
// https://github.com/denoland/deno_std/blob/main/testing/asserts.ts
import {assert} from "https://deno.land/std@0.187.0/testing/asserts.ts";

// https://deno.com/manual@v1.33.3/node/npm_specifiers
// https://github.com/validatorjs/validator.js
import validator from "npm:validator";

import generateCodeChallenge from "../generateCodeChallenge.ts";
import generateCodeVerifier from "../generateCodeVerifier.ts";

Deno.test("Code Challenge should be a base64url encoded string", async () => {
    assert(validator.isBase64(
        await generateCodeChallenge(generateCodeVerifier()),
        {urlSafe: true}
    ));
});


