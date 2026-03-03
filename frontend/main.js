import { createShortUrl, fetchShortUrl, checkShortUrl } from "./api.js";
import { BASE_URL } from "./api.js";



const submmitBtn = document.querySelector("#submit-btn");
const urlInput = document.querySelector("#url-input");
const shortUrlElement = document.querySelector("#url-path");
const listEl = document.querySelector(".short-container-list ul");

console.log(urlInput.value);

//check available path
shortUrlElement.addEventListener("input", debounce(checkAvailableness, 500));

submmitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const url = urlInput.value;
  const customShortUrl = shortUrlElement.value;
  const createData = await createShortUrl(url, customShortUrl);

  //checar se create data veio undefined
  const shortUrl = BASE_URL + "/" + createData.shortUrl;

  const item = mountHTML(shortUrl);
  listEl.appendChild(item);

  console.log(shortUrl);

  urlInput.value = "";
  shortUrlElement.value = "";
});

function mountHTML(shortUrl) {
  let liEl = document.createElement("li");

  let divItem = document.createElement("div");
  divItem.classList.add("item");

  let divItemList = document.createElement("div");
  divItemList.classList.add("item-list");

  let shortText = document.createElement("div");
  shortText.classList.add("short-text");

  const linkEl = document.createElement("a");
  linkEl.href = shortUrl;
  linkEl.target = "_blank";
  linkEl.textContent = shortUrl;

  shortText.append("Short URL: ", linkEl);

  divItemList.appendChild(shortText);
  divItem.appendChild(divItemList);
  liEl.appendChild(divItem);

  return liEl;
}

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

 async function checkAvailableness() {
   if (shortUrlElement.value.length <= 1) {
     shortUrlElement.setAttribute("style", "border-color: red");
   } else {
     const currentValue = shortUrlElement.value;
     const result = await checkShortUrl(shortUrlElement.value);

     if (currentValue !== shortUrlElement.value) {
       return;
     }

     if (!result.available || !result) {
       shortUrlElement.setAttribute("style", "border-color: red");
     } else {
       shortUrlElement.setAttribute("style", "border-color: green");
     }
   }
 };