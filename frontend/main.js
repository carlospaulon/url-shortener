import { createShortUrl, fetchShortUrl } from "./api.js"
import { BASE_URL } from "./api.js";

const submmitBtn = document.querySelector("#submit-btn")
const urlInput = document.querySelector("#url-input");
const shortUrlElement = document.querySelector("#short-url");

console.log(urlInput.value)


submmitBtn.addEventListener("click", async (e) => {
  e.preventDefault()
  const url = urlInput.value;
  const createData = await createShortUrl(url)

  const shortUrl = BASE_URL + "/" + createData.shortUrl
  
  shortUrlElement.setAttribute("href", shortUrl)
  shortUrlElement.textContent = shortUrl

  console.log(shortUrl)
})


