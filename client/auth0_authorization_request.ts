import "https://deno.land/std@0.185.0/dotenv/load.ts";

// import puppeteer from 'npm:puppeteer';
// - does not work, see:
// https://github.com/puppeteer/puppeteer/issues/7115

// https://github.com/ratson/puppeteer_plus
import puppeteer from "https://deno.land/x/puppeteer_plus/mod.ts";

import generateAuthRequestUrl from "./generateAuthRequestUrl.ts";
import generateCodeVerifier from "./generateCodeVerifier.ts";
import generateCodeChallenge from "./generateCodeChallenge.ts";

const auth0_authorization_request = async (
    // url: URL,
    useHeadless: boolean, // false or 'new' (instead of true)
    closeBrowserOnReturn: boolean,
    codeVerifierStr?: string,
    codeChallengeStr?: string
) => {

    const authorizationEndpoint: string | undefined = Deno.env.get("AUTH0_OAUTH_AUTHORIZATION_URL");
    if (!authorizationEndpoint) {
        throw new Error("AUTH0_OAUTH_AUTHORIZATION_URL not found");
    }

    const client_id: string | undefined = Deno.env.get("AUTH0_CLIENT_ID");
    if (!client_id) {
        throw new Error("AUTH0_CLIENT_ID not found");
    }

    // redirect_uri from https://www.udemy.com/course/oauth-2-simplified/ assignments
    const redirect_uri = 'https://example-app.com/redirect';

    const codeVerifier = codeVerifierStr ? codeVerifierStr : generateCodeVerifier();
    const codeChallenge = codeChallengeStr ? codeChallengeStr : await generateCodeChallenge(codeVerifier);

    const scope = undefined;
    const url = await generateAuthRequestUrl(
        authorizationEndpoint,
        client_id,
        redirect_uri,
        scope,
        codeVerifier,
        codeChallenge
    );

    const headless: boolean | "new" | undefined = useHeadless ? "new" : false;

    const browser = await puppeteer.launch({
        headless: headless, // << opens browser on local machine
        // headless: false, // does not work on GAE: Missing X server or $DISPLAY
        // args: ['--no-sandbox',], // not safe to use
        // ignoreHTTPSErrors: true,

        // in case of error as described on https://stackoverflow.com/a/74259041
        // add this:
        // executablePath: executablePath(),
    });

    const page = await browser.newPage();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await page.goto(
        url.toString(),
        // https://cloudlayer.io/blog/puppeteer-waituntil-options/
        {waitUntil: 'networkidle2'} // <<< !
    );

    // fill login form
    // https://www.scrapingbee.com/blog/submit-form-puppeteer/
    const username = Deno.env.get("AUTH0_APP_USER_NAME"); // nodejs: process.env.AUTH0_APP_USER_NAME;
    const password = Deno.env.get("AUTH0_APP_USER_PASSWORD"); // nodejs: process.env.AUTH0_APP_USER_PASSWORD;
    if (username && password) {
        //
    } else {
        console.error('username and/or password not found in .env file');
        return;
    }

    await page.type('input[id=username]', username);
    await page.type('input[id=password]', password);
    // await page.click('button[type=submit]');
    await page.evaluate(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.querySelector('button[type=submit]').click();
    });

    // https://pptr.dev/api/puppeteer.page.waitfornavigation
    await page.waitForNavigation(); // need to wait for page redirect

    const resultUrl = new URL(page.url());

    // console.log(resultUrl.toString());

    if (closeBrowserOnReturn) {
        await browser.close();
    }

    const result = {
        codeVerifier: codeVerifier,
        codeChallenge: codeChallenge,
        resultUrl: resultUrl,
        code: resultUrl.searchParams.get("code")
    };

    // console.log(result);
    // console.log("codeVerifier:", codeVerifier);
    // console.log(result.resultUrl.toString());

    return result;
};

// to run:
// deno run --allow-read --allow-write --allow-env --allow-run --allow-net auth0_authorization_request.ts
// await auth0_authorization_request(
//     false,
//     false
// );

export default auth0_authorization_request;
