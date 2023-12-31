import { shorten } from "./service";

export async function handleRequest(ctx: any) {
    console.log('ctx', ctx)
    if (!(ctx.body && ctx.body.srcUrl)) {
        ctx.set.status = 400;
        return { errMsg: "Parameter 'srcUrl' is missing" };
    }

    const srcUrl = ctx.body.srcUrl;
    if (srcUrl.length > 250) {
        ctx.set.status = 400;
        return {
            errMsg: "Parameter 'srcUrl' must not be more than 250 characters",
        };
    }
    if (!(srcUrl.startsWith("http://") || srcUrl.startsWith("https://"))) {
        ctx.set.status = 400;
        return { errMsg: "Parameter 'srcUrl' must start with http:// or https://" };
    }

    const shortenedUrl = await shorten(srcUrl);
    if (!shortenedUrl) {
        ctx.set.status = 500;
        return { errMsg: "Failed to shorten" };
    }
    return { srcUrl, shortenedUrl };
}