const baseUrl = "https://mini-visitors-service.herokuapp.com/api/entries";

const apiKey = process.env.REACT_APP_X_API_KEY;

const getApi = async () => {
  const response = await fetch(baseUrl, {
    method: "GET",
    headers: { "X-Api-Key": apiKey },
    mode: "cors"
  });

  return response.json();
};

const postApi = async () => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "X-Api-Key": apiKey, "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify({
      data: {
        type: "entries",
        attributes: {
          name: "Dennis Pavao",
          notes: "some notes"
        }
      }
    })
  });

  return await response.json();
};

const signOut = async () => {
  const url = `${baseUrl}/sign_out`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "X-Api-Key": apiKey, "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify({
      data: {
        type: "entries",
        id: "475"
      }
    })
  });

  return await response.json();
};

export { getApi, postApi, signOut };
