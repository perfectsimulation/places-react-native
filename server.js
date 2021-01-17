export const getPins = async () => {
  const pinsData = await fetchPins();
  const pins = pinsData.map((pinData) => parsePin(pinData));
  return pins;
}

export const getAgents = async () => {
  const agentsData = await fetchAgents();
  const agents = agentsData.map((agentData) => parseAgent(agentData));
  return agents;
}

export const getPhotoUrlById = async (photoId) => {
  if (photoId === undefined || photoId[0] === undefined) {
    return getPlaceholderPhotoUrl();
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

const fetchAgents = async () => {
  return fetch(`${rootUrl}/agents`)
    .then((response) => response.json())
    .then((json) => json);
}

// fetch photo by ID
const fetchPhotoById = async (photoId) => {
  return fetch(`${rootUrl}/photos/${photoId}`)
    .then((response) => response.json())
    .then((json) => json);
}

// use placeholder image url for pins without any uploaded photos
const getPlaceholderPhotoUrl = () => {
  return 'https://vtskiandride.com/wp-content/uploads/2015/08/placeholder.jpg';
}

// construct pin object from response
const parsePin = (pinData) => {
  const pin = {
    'id': pinData.id,
    'authorUserId': pinData.authorUserId,
    'privateUserIds': pinData.privateUserIds,
    'photoIds': pinData.photoIds,
    'eventIds': pinData.eventIds,
    'publishTime': pinData.publishTime,
    'pinColor': pinData.pinColor,
    'title': pinData.title,
    'description': pinData.description,
    'isPublic': pinData.isPublic,
    'coordinate': {
      'latitude': pinData.latitude,
      'longitude': pinData.longitude,
      'latitudeDelta': pinData.latitudeDelta,
      'longitudeDelta': pinData.longitudeDelta,
    }
  };

  return pin;
}

const parseAgent = (agentData) => {
  const agent = {
    'id': agentData.id,
    'name': agentData.name,
    'photoId': agentData.photoId,
    'noteIds': agentData.noteIds,
    'eventIds': agentData.eventIds
  };

  return agent;
}
