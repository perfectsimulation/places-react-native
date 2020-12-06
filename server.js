export const getPins = async () => {
  const pinsData = await fetchPins();
  const pins = pinsData.map((pinData) => parsePin(pinData));
  return pins;
}

export const getPhotoUrlById = async (photoId) => {
  if (!photoId[0] || !parseFloat(photoId)) {
    return 'https://vtskiandride.com/wp-content/uploads/2015/08/placeholder.jpg';
  }
  const photo = await fetchPhotoById(photoId[0]);
  const photoUrl = photo.url;
  return photoUrl;
}

// prepend to all fetch request URLs
const rootUrl = 'https://my-json-server.typicode.com/perfectsimulation/based';

// fetch all pins
const fetchPins = async () => {
  return fetch(`${rootUrl}/pins`)
    .then((response) => response.json())
    .then((json) => json);
}

// fetch photo by ID
const fetchPhotoById = async (photoId) => {
  return fetch(`${rootUrl}/photos/${photoId}`)
    .then((response) => response.json())
    .then((json) => json);
}

// construct pin object from response
const parsePin = (pinData) => {
  const pin = {
    'id': pinData.id,
    'userId': pinData.userId,
    'publishTime': pinData.publishTime,
    'photoIds': pinData.photoIds,
    'title': pinData.title,
    'description': pinData.description,
    'access': pinData.access,
    'coordinate': {
      'latitude': pinData.latitude,
      'longitude': pinData.longitude
    }
  };

  return pin;
}
