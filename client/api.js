async function sendData(url, method, data) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + sessionStorage.getItem("accessToken"),
  };

  const fetchOption = {
    method: method,
    body: JSON.stringify(data), // transfer data to json
    headers,
  };

  return await fetch(url, fetchOption);
}

async function authenticate(authDetails) {
  let response = await sendData(
    "http://127.0.0.1:6060/auth/login",
    "POST",
    authDetails
  );

  const accessToken = await response.text();

  sessionStorage.setItem("accessToken", accessToken);
}
