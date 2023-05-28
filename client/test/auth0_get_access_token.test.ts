// https://deno.com/manual@main/basics/testing/assertions
// https://github.com/denoland/deno_std/blob/main/testing/asserts.ts
import {assertExists} from "https://deno.land/std@0.187.0/testing/asserts.ts";
import auth0_get_access_token from "../auth0_get_access_token.ts";
import base64url from "../base64url.ts";

Deno.test("Should get access token from Auth0", async () => {

    const accessTokenResponse = await auth0_get_access_token();

    // writing received access token to ./data/ directory:
    await Deno.writeTextFile("./data/accessToken" + Date.now().toString() + ".json", JSON.stringify(accessTokenResponse));
    // {
    //     access_token: "eyJh...",
    //     expires_in: 86400,
    //     token_type: "Bearer"
    // }

    const accessToken = accessTokenResponse.access_token;
    assertExists(accessToken);

    // decode token (JWT) and write to file:
    const arr = accessToken.split(".");
    const jwt = [
        JSON.parse(base64url.decodeToString(arr[0])),
        JSON.parse(base64url.decodeToString(arr[1]))
    ];

    await Deno.writeTextFile("./data/accessTokenDecoded" + Date.now().toString() + ".json", JSON.stringify(jwt));
})

Deno.test("Should get refresh token from Auth0", async () => {
    const refreshTokenResponse = await auth0_get_access_token(
        "offline_access",
    );
    // {
    //     access_token: "eyJhbG...",
    //     refresh_token: "sy1...",
    //     scope: "offline_access",
    //     expires_in: 86400,
    //     token_type: "Bearer"
    // }
    assertExists(refreshTokenResponse.refresh_token);
    await Deno.writeTextFile("./data/refreshToken" + Date.now().toString() + ".json", JSON.stringify(refreshTokenResponse));
})
