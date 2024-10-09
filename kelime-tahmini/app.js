// html den gerekli elementleri seç
const inputs = document.querySelector(".word"),
    typeInput = document.querySelector(".type-input"),
    hintTag = document.querySelector(".hint span"),
    guessLeft = document.querySelector(".guess span"),
    mistakes = document.querySelector(".wrong span"),
    resetBtn = document.querySelector(".reset"),
    hintBtn = document.querySelector(".show-hint"),
    hintElement = document.querySelector(".hint");

// oyunda kullancağımız değişkenler
let word,
    incorrectLetters = [],
    correctLetters = [],
    maxGuess;

// yeni oyun başlatmak için kullanılcak fonk.
function startNewGame() {

    // ipucu elementini gizle
    hintElement.style.display = "none";
    hintElement.style.opacity = "0";

    // veritabanından rastgele bi kelime seç ve oyunu hazırla
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

    word = randomWord.word;

    maxGuess = word.length;
    incorrectLetters = [];
    correctLetters = [];
    hintTag.innerText = randomWord.hint;
    guessLeft.innerText = maxGuess;
    mistakes.innerText = incorrectLetters;

    // her harf için bir input oluştur
    inputs.innerHTML = "";
    for (let i = 0; i < word.length; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.disabled = true;
        inputs.appendChild(input)
    }
}

// kullanıcı girişini işleyip oyun istatistiklerini güncelleyen fonk.
function handleInput(e) {
    //geçersiz karakter ve zaten tahmin edilmiş harfleri dikkate alma
    const key = e.target.value.toLowerCase();
    if (key.match(/^[a-z]+$/i) && !incorrectLetters.includes(`${key}`) && !correctLetters.includes(`${key}`)) {
        // harfin kelimenin içinde olup olmadığını kontrol et
        if (word.includes(key)) {
            // doğru tahmini güncelle
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    inputs.querySelectorAll("input")[i].value += key;
                }
            }
            correctLetters += key;
        }
        else {
            // yanlış tahmini güncelle
            maxGuess = maxGuess - 1;
            incorrectLetters.push(`${key}`);
            mistakes.innerText = incorrectLetters;
            guessLeft.innerText = maxGuess;

        }
    }
    console.log(maxGuess);

    //kalan tahmini sayısını güncelle ve oyunun kazanma kaybetme koşullarını kontrol et.
    if (correctLetters.length === word.length) {
        alert(`Tebrikler kelimeyi buldun: ${word.toUpperCase()}`);
    }
    else if (maxGuess <= 0) {
        alert("Tahmin hakkın bitti.");
        // inputlara doğru harfleri yazdır
        for (let i = 0; i < word.length; i++) {
            inputs.querySelectorAll("input")[i].value = word[i];
        }
    }

    // giriş alanını temizle
    typeInput.value = "";
}

// ipucunu gösteren fonk.
function showHintElement() {
    hintElement.style.display = "block";
    hintElement.style.opacity = "0.9";
}

// eventleri ayarla
resetBtn.addEventListener("click", startNewGame);
hintBtn.addEventListener("click", showHintElement);
typeInput.addEventListener("input", handleInput);
inputs.addEventListener("click", () => typeInput.focus());
document.addEventListener("keydown", () => typeInput.focus());

// yeni oyun başlat
startNewGame();