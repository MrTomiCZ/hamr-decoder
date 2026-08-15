import {
  outputAlphabetASCII,
  outputAlphabetQR,
  outputAlphabetEmoji
} from "./alphabets.js";
import { decompress } from "./compress.js";

(() => {
  let payload = null;
  let alphabet = outputAlphabetASCII;

  // Get hash value of current address bar
  if (window.location.hash) {
    // Decode hash value in case it's non-ASCII
    payload = decodeURIComponent(window.location.hash.slice(1));
    // Remove all whitespace - we never use whitespace when encoding hash values
    payload = payload.replaceAll(" ", "");
    // Check if input is pure ASCII - potentially unreliable?
    const useEmoji = Array.from(payload).some(c => !outputAlphabetASCII.includes(c));
    alphabet = useEmoji ? outputAlphabetEmoji : outputAlphabetASCII;
  } else {
    // If no hash value, we're likely reading a QR code
    // For that, use the path instead
    payload = decodeURIComponent(window.location.pathname.slice(1));
    alphabet = outputAlphabetQR;
  }

  if (payload && payload.trim()) {
    try {
      const target = decompress(payload, alphabet);
//      window.location.href = target;
      alert(target);
      return;
    } catch (e) {
//      console.warn(`Redirect failed. Could not decode input.`);
      alert("couldnt decode");
      console.error(e);
    }
  }

//  updateOutput();

//  document.querySelector("#loader").style.opacity = 0;
//  document.querySelector("#content").style.opacity = 1;
//  document.querySelector("#content").style.pointerEvents = "auto";

})();
