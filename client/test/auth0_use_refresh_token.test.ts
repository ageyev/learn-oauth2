import auth0GetAccessToken from "../auth0_get_access_token.ts";
import auth0UseRefreshToken from "../auth0_use_refresh_token.ts";
import auth0_get_access_token from "../auth0_get_access_token.ts";
import {assertExists} from "https://deno.land/std@0.83.0/testing/asserts.ts";

Deno.test("Should use refresh token to get new access token", async () => {

    const refreshTokenResponse = await auth0_get_access_token(
        "offline_access",
    );

    if (!refreshTokenResponse.refresh_token) throw new Error("Refresh token not received");

    const newAccessTokenResponse = await auth0UseRefreshToken(refreshTokenResponse.refresh_token);
    assertExists(newAccessTokenResponse.access_token);

})

