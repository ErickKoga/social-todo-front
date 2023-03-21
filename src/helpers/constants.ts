const API_URL = `${process.env.API_HOST}:${process.env.API_PORT}`;

export const ENDPOINTS = {
  AUTH: `${API_URL}/auth`,
  USER: `${API_URL}/users`,
  TODO: `${API_URL}/todo`,
};
