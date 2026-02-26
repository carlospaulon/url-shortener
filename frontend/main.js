import { createShortUrl, fetchShortUrl } from "./api.js";
import { BASE_URL } from "./api.js";

const submmitBtn = document.querySelector("#submit-btn");
const urlInput = document.querySelector("#url-input");
const shortUrlElement = document.querySelector("#short-url");

const listEl = document.querySelector(".short-container-list ul");

console.log(urlInput.value);

submmitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const url = urlInput.value;
  const createData = await createShortUrl(url);

  const shortUrl = BASE_URL + "/" + createData.shortUrl;

  const item = mountHTML(shortUrl)
  listEl.appendChild(item)

  console.log(shortUrl);

  urlInput.value = ""
});


function mountHTML(shortUrl) {
  let liEl = document.createElement("li");

  let divItem = document.createElement("div");
  divItem.classList.add("item");

  let divItemList = document.createElement("div");
  divItemList.classList.add("item-list");

  let shortText = document.createElement("div");
  shortText.classList.add("short-text")

  const linkEl = document.createElement("a")
  linkEl.href = shortUrl
  linkEl.target = "_blank"
  linkEl.textContent = shortUrl

  shortText.append("Short URL: ", linkEl)

  divItemList.appendChild(shortText);
  divItem.appendChild(divItemList);
  liEl.appendChild(divItem);

  return liEl;
}
