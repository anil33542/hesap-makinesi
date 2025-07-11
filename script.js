const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const colorPicker = document.getElementById("colorPicker");

let currentInput = "";

// Butonlara tıklama
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      // Tam temizle
      currentInput = "";
      display.value = "";
    } else if (value === "⌫") {
      // Tek karakter sil
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
    } else if (value === "=") {
      // Hesaplama yap
      try {
        currentInput = eval(currentInput).toString();
        display.value = currentInput;
      } catch {
        display.value = "Hata!";
        currentInput = "";
      }
    } else {
      // Normal yazdır
      currentInput += value;
      display.value = currentInput;
    }
  });
});

// Buton rengini renk seçiciden değiştir
colorPicker.addEventListener("input", () => {
  const selectedColor = colorPicker.value;
  buttons.forEach(button => {
    button.style.backgroundColor = selectedColor;
    button.style.borderColor = selectedColor;
    button.style.boxShadow = "none";
    button.style.color = getContrastYIQ(selectedColor);
  });
});

// Yazı rengini kontrast ayarla
function getContrastYIQ(hexcolor){
  hexcolor = hexcolor.replace("#", "");
  const r = parseInt(hexcolor.substr(0,2),16);
  const g = parseInt(hexcolor.substr(2,2),16);
  const b = parseInt(hexcolor.substr(4,2),16);
  const yiq = ((r*299)+(g*587)+(b*114))/1000;
  return (yiq >= 128) ? 'black' : 'white';
}

// Klavyeden yazma desteği
window.addEventListener("keydown", (e) => {
  if (
    (e.key >= "0" && e.key <= "9") ||
    ["+", "-", "*", "/", ".", "=", "Backspace", "Enter"].includes(e.key)
  ) {
    e.preventDefault();

    if (e.key === "Backspace") {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
    } else if (e.key === "Enter" || e.key === "=") {
      try {
        currentInput = eval(currentInput).toString();
        display.value = currentInput;
      } catch {
        display.value = "Hata!";
        currentInput = "";
      }
    } else {
      currentInput += e.key;
      display.value = currentInput;
    }
  }
});
// Hesap makinesi kutusunun iç arka plan rengini değiştirme
const calculatorBgPicker = document.getElementById("calculatorBgPicker");

calculatorBgPicker.addEventListener("input", function () {
  document.querySelector(".calculator").style.background = this.value;
});
// Arka plan rengini değiştirme
const backgroundColorPicker = document.getElementById("backgroundColorPicker");

backgroundColorPicker.addEventListener("input", function () {
  document.body.style.background = this.value;
});
