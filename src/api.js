import cache from 'memory-cache';
const baseUrl = 'https://mini-visitors-service.herokuapp.com/api/entries';
const apiKey = process.env.REACT_APP_X_API_KEY;

const handleRequest = async (url, fetchOptions) => {
  // the get visitor and add visitor have the same url, so need
  // differentiate key with their methods
  const key = `__cache__${fetchOptions.method}__${url}`;
  let result = cache.get(key);


  if (!result) {
    const response = await fetch(url, fetchOptions);
    const isPostRequest = fetchOptions.method === 'POST';
    result = response.json();
    if (isPostRequest) {
      // all GET requests should de-cached whenever a POST operation takes place
      cache.clear();
    } else {
      cache.put(key, result);
    }
  }

  return result;
};

const getVisitors = async filterOptions => {
  const url = filterOptions.name
    ? `${baseUrl}?filter[name]=${filterOptions.name}`
    : baseUrl;

  const response = await handleRequest(url, {
    method: 'GET',
    headers: { 'X-Api-Key': apiKey },
    mode: 'cors'
  });

  return response;
};

const addVisitor = async ({ name, notes }) => {
  return await handleRequest(baseUrl, {
    method: 'POST',
    headers: { 'X-Api-Key': apiKey, 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify({
      data: {
        type: 'entries',
        attributes: {
          name,
          notes
        }
      }
    })
  });
};

const signOut = async id => {
  const url = `${baseUrl}/sign_out`;
  return await handleRequest(url, {
    method: 'POST',
    headers: { 'X-Api-Key': apiKey, 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify({
      data: {
        id,
        type: 'entries'
      }
    })
  });
};

export { getVisitors, addVisitor, signOut };
