export default async function handler(request, response) {
  if (request.method === "GET") {
    const params = request.query;
    console.log("para", params);
    const entries = Object.entries(params);
    const urlParams = entries.map((entry) => entry.join("=")).join("&");

    const res = await fetch(
      `https://newsapi.org/v2/everything?${urlParams}&apiKey=fb05f04d266e4823b11f86f3763d416e`
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
