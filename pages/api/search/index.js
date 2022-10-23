export default async function handler(request, response) {
  if (request.method === "POST") {
    const { keywords, sources, domains, from, to, language, sortBy } =
      JSON.parse(request.body);
    const params = createParams(
      keywords,
      sources,
      domains,
      from,
      to,
      language,
      sortBy
    );
    const res = await fetch(
      `https://newsapi.org/v2/everything?${params}apiKey=fb05f04d266e4823b11f86f3763d416e`
    );
    const data = await res.json();
    if (data.status === "error")
      return response
        .status(406)
        .json([{ message: data.message, alert: "error" }]);
    else {
      if (data.totalResults === 0)
        return response
          .status(200)
          .json([{ message: "no article found!", alert: "warning" }]);
      return response.status(200).json(data.articles);
    }
  }
  response.status(403).json({ message: "Error: request method not allowed." });
}

function createParams(keywords, sources, domains, from, to, language, sortBy) {
  let params = "";
  if (keywords !== "") params += "q=" + keywords + "&";
  if (sources !== "") params += "sources=" + sources + "&";
  if (domains !== "") params += "domains=" + domains + "&";
  if (from !== "") params += "&from=" + from + "&";
  if (to !== "") params += "&to=" + to + "&";
  if (language !== "") params += "&language=" + language + "&";
  if (sortBy !== "" && sortBy !== "publishedAt")
    params += "&sortBy=" + sortBy + "&";

  return params;
}
