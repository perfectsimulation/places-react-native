export default loadPins = async () => {
  const userPins = await getUserPins();
  return userPins;
}

const getUserPins = async () => {
  const users = await getUsers();
  const userPins = users.map((user) => parseUserPin(user));
  return userPins;
}

const getUsers = async () => {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => json);
}

const parseUserPin = (user) => {
  const userPin = {
    "key": user.id,
    "user": user.name,
    "title": user.company.name,
    "description": user.company.catchPhrase,
    "coordinate": {
      "latitude": parseFloat(user.address.geo.lat),
      "longitude": parseFloat(user.address.geo.lng)
    }
  };

  return userPin;
}
