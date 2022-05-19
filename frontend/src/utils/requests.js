
const postData = async (url = '', data = {}) => {
  console.log('postData', url, data);
  const response = await fetch(url, {
    method: 'POST',
    // credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const getData = async (url = '') => {
  return fetch(url, {
    method: 'GET',
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch(async () => {
      console.log('Offline mode detected');
      return db
        .info()
        .then(() => {
          // Database exists (can't check if is complete or not)
          return { error: 'offline' };
        })
        .catch(() => {
          // Database does not exist, block acess to the app
          return { error: 'unauthorized' };
        });
    });
};

const putBlob = async (url = '', header = {}, data = {}) => {
  console.log('putBlob', url, header, data);
  const body = JSON.stringify(data);
  const bodyLength = new TextEncoder().encode(body).length;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: '*/*',
      Connection: 'keep-alive',
      authorization: `Bearer ${header.accessToken}`,
      'x-ms-date': new Date().toGMTString(),
      'x-ms-version': '2020-04-08',
      'x-ms-blob-type': 'BlockBlob',
      'content-length': bodyLength,
    },
    body,
  });
  return response;
};

export { getData, postData, putBlob };
