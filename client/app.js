const usernameField = document.querySelector(".username-field");
const passwordField = document.querySelector(".password-field");
const loginBtn = document.querySelector(".login-btn");
const serverInfo = document.querySelector(".server-info");
const allChannels = document.querySelector(".allChannels");
const chooseChannel = document.querySelector(".chooseChannel");
const channelInput = document.querySelector(".channel-input");
const chatMessageInput = document.querySelector(".message-input");
const ALL_CHANNELS_URL = "http://127.0.0.1:6060/ducks/api/channel";

async function handelAuthentication() {
  serverInfo.textContent = "You are signing in...";
  const authDetails = {
    username: usernameField.value,
    password: passwordField.value,
  };
  // authenticate with server
  await authenticate(authDetails);
  serverInfo.textContent = `Welcome ${usernameField.value}!`;

  fetchChannels();
}

loginBtn.addEventListener("click", handelAuthentication);

async function fetchChannels() {
  chooseChannel.textContent = "Available channels:";
  const authorizationToken = sessionStorage.getItem("accessToken");

  if (authorizationToken == undefined) {
    console.log("No auth token found");
    return false;
  }

  const fetchOption = {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + authorizationToken,
    },
  };

  const response = await fetch(ALL_CHANNELS_URL, fetchOption);
  const data = await response.json();
  for (let i = 0; i < data.length; i++) {
    let newData = data[i].subject;
    allChannels.textContent += " " + newData + "✔  ";
  }
}
