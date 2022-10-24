import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
export default async function handler(request, response) {
  if (request.method === "GET") {
    const { url } = request.query;
    const fetchresponse = await fetch(url);
    const data = await fetchresponse.text();
    const dom = new JSDOM(data, { url: url });
    const article = new Readability(dom.window.document).parse();
    return response.status(200).json(article.content);
  }
  response.status(403).json({ message: "Error: request method not allowed." });
}
