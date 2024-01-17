var output = document.getElementById("output");
var keyboard = document.getElementById("keyboard");
var isCapsLock = false;
var isShift = false;
var isEnglish = true;

var keys = {
  english: [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
    ["CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
    ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
    ["En / Ру", "Space", "Clear"],
  ],
  russian: [
    ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace"],
    ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
    ["CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"],
    ["Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "."],
    ["En / Ру", "Space", "Clear"],
  ],
};

function createKeyboard(lang) {
  keyboard.innerHTML = "";
  keys[lang].forEach(function (row) {
    var rowElement = document.createElement("div");
    rowElement.style.display = "flex";
    row.forEach(function (key) {
      var keyElement = document.createElement("div");
      keyElement.classList.add("key");
      if (
        key === "Backspace" ||
        key === "CapsLock" ||
        key === "Shift" ||
        key === "En / Ру" ||
        key === "Clear"
      ) {
        keyElement.classList.add("special");
      } else if (key === "Space") {
        keyElement.classList.add("spacebar");
      }
      keyElement.textContent = isCapsLock || isShift ? key.toUpperCase() : key;
      keyElement.addEventListener("click", function () {
        if (key === "Backspace") {
          output.textContent = output.textContent.slice(0, -1);
        } else if (key === "Clear") {
          output.textContent = "";
        } else if (key === "CapsLock") {
          isCapsLock = !isCapsLock;
          createKeyboard(isEnglish ? "english" : "russian");
        } else if (key === "Shift") {
          isShift = true;
          createKeyboard(isEnglish ? "english" : "russian");
        } else if (key === "En / Ру") {
          isEnglish = !isEnglish;
          createKeyboard(isEnglish ? "english" : "russian");
        } else if (key === "Space") {
          output.textContent += " ";
        } else {
          output.textContent += this.textContent;
          if (isShift) {
            isShift = false;
            createKeyboard(isEnglish ? "english" : "russian");
          }
        }
      });
      rowElement.appendChild(keyElement);
    });
    keyboard.appendChild(rowElement);
  });
}

createKeyboard("english");
