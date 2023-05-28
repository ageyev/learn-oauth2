import {Application, Router} from "https://deno.land/x/oak@v12.4.0/mod.ts";
import testRoute from "./testRoute.ts";
import urlSearchParamsObjToJSON from "./urlSearchParamsObjToJSON.ts";

const port = 3001;

const router = new Router();
const app = new Application();

let db = {};

router.get("/test", testRoute);
router.post("/test", testRoute);

router.post('/login', async (ctx) => {
    // https://deno.land/x/oak@v11.1.0/request.ts?s=Request
    const request = ctx.request;
    // https://deno.land/x/oak@v11.1.0/body.ts?s=Body
    const requestBody = request.body({type: "form"});
    // https://deno.land/api@v1.34.0?s=URLSearchParams
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    const formData = await requestBody.value;

    console.log(urlSearchParamsObjToJSON(formData));

});
router.post('/register', async (ctx) => {
    // https://deno.land/x/oak@v11.1.0/request.ts?s=Request
    const request = ctx.request;
    // https://deno.land/x/oak@v11.1.0/body.ts?s=Body
    const requestBody = request.body();
    console.log(requestBody);
});

app.use(router.routes());

// https://deno.land/x/oak@v12.4.0/mod.ts?s=Router#method_allowedMethods_0
// Middleware that handles requests for HTTP methods registered with the router. If none of the routes handle a method,
// then "not allowed" logic will be used. If a method is supported by some routes, but not the particular matched router,
// then "not implemented" will be returned.
app.use(router.allowedMethods());

// Send static content, see:
// https://github.com/oakserver/oak/blob/main/examples/staticServer.ts
// You should use the static router at last, because when use static server first, dynamic router is not reachable,
// see: https://stackoverflow.com/questions/65480042/how-can-i-serve-static-content-alongside-dynamic-routes-in-a-deno-oak-server
app.use(async (ctx) => {
    await ctx.send({
        root: `${Deno.cwd()}/static`,
        index: "index.html",
    });
});

// Remember to put the event listener (addEventListener) in front of the actual listening (listen),
// otherwise the listener will never get executed
app.addEventListener('listen', () => {
    console.log(`Listening on localhost:${port}`);
});

app.listen({port: port});