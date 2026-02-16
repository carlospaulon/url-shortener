export const BASE_URL = "http://localhost:3000";

export async function fetchShortUrl(shortUrl) {
  try {
    const response = await axios.get(`${BASE_URL}/${shortUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error on fetching url:", error);
  }
}

export async function createShortUrl(originalUrl) {
  try {
    const response = await axios.post(`${BASE_URL}/api/shorten`, {
      originalUrl,
    });
    return response.data;
  } catch (error) {
    console.error("Error on creating a short url:", error);
  }
}
