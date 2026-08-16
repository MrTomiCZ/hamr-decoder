//alert("SKRIPT SE NACET");
import {
  outputAlphabetASCII,
  outputAlphabetQR,
  outputAlphabetEmoji
} from "./alphabets.js";
import { decompress } from "./compress.js";
console.log("bp1");
(() => {
  let payload = null;
  let alphabet = outputAlphabetASCII;

  // Get hash value of current address bar
  if (window.location.hash) {
    console.log("bp21");
    // Decode hash value in case it's non-ASCII
    payload = decodeURIComponent(window.location.hash.slice(1));
    // Remove all whitespace - we never use whitespace when encoding hash values
    payload = payload.replaceAll(" ", "");
    // Check if input is pure ASCII - potentially unreliable?
    const useEmoji = Array.from(payload).some(c => !outputAlphabetASCII.includes(c));
    alphabet = useEmoji ? outputAlphabetEmoji : outputAlphabetASCII;
  } else {
    console.log("bp22");
    // If no hash value, we're likely reading a QR code
    // For that, use the path instead
    payload = decodeURIComponent(window.location.pathname.slice(1));
    alphabet = outputAlphabetQR;
  }
console.log("bp3");
  if (payload && payload.trim()) {
    console.log("bp41");
    try {
      console.log("bp411");
      const target = decompress(payload, alphabet);
//      window.location.href = target;
      //alert(target);
      decoded.innerText = target;
      return;
    } catch (e) {
      console.log("bp412");
//      console.warn(`Redirect failed. Could not decode input.`);
      decoded.innerText = "Couldn't decode";
      decoded.classList.remove("decoded");
      decoded.classList.add("error");
      console.error(e);
    }
  } else {
    console.log("bp42");
  }

//  updateOutput();

//  document.querySelector("#loader").style.opacity = 0;
//  document.querySelector("#content").style.opacity = 1;
//  document.querySelector("#content").style.pointerEvents = "auto";

})();

