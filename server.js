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
    "photo": getPhotoUrlFromKey(user.id),
    "coordinate": {
      "latitude": parseFloat(user.address.geo.lat),
      "longitude": parseFloat(user.address.geo.lng)
    }
  };

  return userPin;
}

const unsplash = [
  'https://images.unsplash.com/photo-1482686115713-0fbcaced6e28',
  'https://images.unsplash.com/photo-1512420502149-ebd993111c3d',
  'https://images.unsplash.com/photo-1545375359-366c37031751',
  'https://images.unsplash.com/photo-1481775151609-8432461b024c',
  'https://images.unsplash.com/photo-1587732282555-321fddb19dc0',
  'https://images.unsplash.com/photo-1543430704-9b1f6dbcec76',
  'https://images.unsplash.com/photo-1576080121747-26ade08979f0',
  'https://images.unsplash.com/photo-1523437237164-d442d57cc3c9',
  'https://images.unsplash.com/photo-1516481605912-d34c1411504c',
  'https://images.unsplash.com/photo-1511860810434-a92f84c6f01e',
  'https://images.unsplash.com/photo-1511497584788-876760111969',
  'https://images.unsplash.com/photo-1523152694284-c6cb4816d021',
  'https://images.unsplash.com/photo-1505490096310-204ef067fe6b',
  'https://images.unsplash.com/photo-1605492532891-0c7bd8fbda60',
  'https://images.unsplash.com/photo-1467625575448-2ef10dabab8a',
  'https://images.unsplash.com/photo-1570155477957-321e66a5751e',
  'https://images.unsplash.com/photo-1605309367703-fc6e040816bf',
  'https://images.unsplash.com/photo-1596709097416-6d4206796022',
  'https://images.unsplash.com/photo-1575602447714-7effec0d671c',
  'https://images.unsplash.com/photo-1605014093414-29b156556886',
  'https://images.unsplash.com/photo-1605100970536-2046737bc76d',
  'https://images.unsplash.com/photo-1486723312829-f32b4a25211b',
  'https://images.unsplash.com/photo-1440581572325-0bea30075d9d',
  'https://images.unsplash.com/photo-1606411009963-3c3192b48461',
  'https://images.unsplash.com/photo-1453791052107-5c843da62d97',
  'https://images.unsplash.com/photo-1606661247834-eb1f16814366',
  'https://images.unsplash.com/photo-1606749128514-01add013f5c7',
  'https://images.unsplash.com/photo-1593435345061-bc72741e9218',
  'https://images.unsplash.com/photo-1534268899497-575627888c01',
  'https://images.unsplash.com/photo-1491331606314-1d15535360fa',
  'https://images.unsplash.com/photo-1604761773777-d478adb6a484',
  'https://images.unsplash.com/photo-1605445449313-e89bb6d265da',
  'https://images.unsplash.com/photo-1606245766933-b194a66b0380',
  'https://images.unsplash.com/photo-1582403609737-a34c5fc4daa6',
];

const getPhotoUrlFromKey = (key) => {
  const index = (key - 1) % unsplash.length;
  return unsplash[index];
}
