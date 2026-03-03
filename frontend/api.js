export const BASE_URL = "http://localhost:3000";

export async function fetchShortUrl(shortUrl) {
  try {
    const response = await axios.get(`${BASE_URL}/${shortUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error on fetching url:", error);
  }
}

export async function createShortUrl(originalUrl, shortUrl) {
  try {
    const response = await axios.post(`${BASE_URL}/api/shorten`, {
      originalUrl,
      shortUrl
    });
    return response.data;
  } catch (error) {
    console.error("Error on creating a short url:", error);
  }
}

export async function checkShortUrl(shortUrl) {
  try {
    const response = await axios.get(`${BASE_URL}/api/check/${shortUrl}`);
    return response.data
  } catch (error) {
    console.error("Error on checking the Short URL: ", error)
  }
}