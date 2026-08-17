const baseUrl = "http://localhost:3001";

const headers = { "Content-Type": "application/json" };

const authHeaders = (token) => ({
  ...headers,
  authorization: `Bearer ${token}`,
});

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);
};

export const addItem = ({ name, imageUrl, weather }, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
};

export const deleteItem = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  }).then(handleServerResponse);
};

export const addCardLike = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: authHeaders(token),
  }).then(handleServerResponse);
};

export const removeCardLike = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: authHeaders(token),
  }).then(handleServerResponse);
};

export const updateUserProfile = ({ name, avatar }, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);
};
