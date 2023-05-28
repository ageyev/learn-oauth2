// https://deno.com/manual@main/basics/testing/assertions
// https://github.com/denoland/deno_std/blob/main/testing/asserts.ts
import {assert, assertEquals} from "https://deno.land/std@0.187.0/testing/asserts.ts";

// https://deno.com/manual@v1.33.3/node/npm_specifiers
// https://github.com/validatorjs/validator.js
import validator from "npm:validator";

import base64url from "../base64url.ts";

Deno.test("Should encode string to base64url", () => {
    const inputStr = "some text";
    const outputStr = base64url.encodeString(inputStr);
    assert(validator.isBase64(outputStr, {urlSafe: true}));
});

Deno.test("Should encode base64url to string", () => {
    const inputStr = "VGVzdCB0ZXh0"; // "Test text"
    const outputStr = base64url.decodeToString(inputStr);
    assertEquals(outputStr, "Test text");
});
