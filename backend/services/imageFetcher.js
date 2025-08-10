import fetch from 'node-fetch';

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export async function fetchImageUrl(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${process.env.UNSPLASH_ACCESS_KEY}&per_page=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.small; // or regular, full based on need
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    return null;
  }
}
