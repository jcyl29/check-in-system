
// curl -H "X-Api-Key: a9bcae20371ea29613ac" -g "https://mini-visitors-service.herokuapp.com/api/entries"
const baseUrl = "https://mini-visitors-service.herokuapp.com/api/entries";

const apiKey = process.env.REACT_APP_X_API_KEY;

const testApi = async () => {
  const response = await fetch(baseUrl, {
    method: "GET",
    headers: { "X-Api-Key": apiKey },
    mode: "cors"
  });

  return response.json();
};

export { testApi };
