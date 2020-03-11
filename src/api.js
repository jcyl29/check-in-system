const baseUrl = 'https://mini-visitors-service.herokuapp.com/api/entries';

const apiKey = process.env.REACT_APP_X_API_KEY;

const getVisitors = async () => {
  const response = await fetch(baseUrl, {
    method: 'GET',
    headers: { 'X-Api-Key': apiKey },
    mode: 'cors'
  });

  return response.json();
};

const addVisitor = async ({ name, notes }) => {
  const response = await fetch(baseUrl, {
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

  return await response.json();
};

const signOut = async id => {
  const url = `${baseUrl}/sign_out`;
  const response = await fetch(url, {
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

  return await response.json();
};

export { getVisitors, addVisitor, signOut };
