import { nanoid } from "nanoid";
import { save } from "./db.js";
const baseUrl = "http://test.short/";

export async function shorten(srcUrl: string) {
    if (!srcUrl) {
        return;
    }

    const urlId = nanoid(10);
    const shortenedUrl = `${baseUrl}${urlId}`;

    const dbStatus = await save(urlId, srcUrl);
    console.log('db response', dbStatus);
    return dbStatus ? shortenedUrl : undefined;
}