// https://deno.com/manual@main/basics/testing/assertions
// https://github.com/denoland/deno_std/blob/main/testing/asserts.ts
import {assert, assertExists} from "https://deno.land/std@0.187.0/testing/asserts.ts";
import auth0_get_access_token from "../auth0_get_access_token.ts";

Deno.test("Should get access token from Auth0", async () => {
    const accessTokenResponse = await auth0_get_access_token();
    // console.log("accessTokenResponse:");
    // console.log(accessTokenResponse);
    // {
    //     access_token: "eyJh...",
    //     expires_in: 86400,
    //     token_type: "Bearer"
    // }
    assertExists(accessTokenResponse.access_token);

})

Deno.test("Should get refresh token from Auth0", async () => {
    const refreshTokenResponse = await auth0_get_access_token(
        "offline_access",
    );
    // console.log("refreshTokenResponse:");
    // console.log(refreshTokenResponse);
    // {
    //     access_token: "eyJhbG...",
    //     refresh_token: "sy1...",
    //     scope: "offline_access",
    //     expires_in: 86400,
    //     token_type: "Bearer"
    // }
    assertExists(refreshTokenResponse.refresh_token);
})
