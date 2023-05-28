import auth0_get_access_token from "../auth0_get_access_token.ts";
import auth0RevokeToken from "../auth0_revoke_token.ts";
import {assertEquals} from "https://deno.land/std@0.83.0/testing/asserts.ts";

Deno.test("Should revoke token on Auth0", async () => {
    const accessToken = (await auth0_get_access_token()).access_token;
    const revokeTokenResponse = await auth0RevokeToken(accessToken);
    assertEquals(revokeTokenResponse.status, 200);
})