import {Context} from "https://deno.land/x/oak@v12.4.0/context.ts";

const testRoute = (ctx: Context) => {
    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.body = {
        data: "test",
    }
};

export default testRoute;

