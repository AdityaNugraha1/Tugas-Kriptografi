const alphabet = "abcdefghijklmnopqrstuvwxyz";
const regex = /^[a-zA-Z]+$/;

const caesarCipher = (plaintext, key) => {
  let ciphertext = "";
  key = key%26;
  for (let i = 0; i < plaintext.length; i++) {
    let char = plaintext.charAt(i);

    if (char=== ' '|| !regex.test(char)) {
      ciphertext += char;
    } else {
      const newChar = alphabet[(alphabet.indexOf(char) + key) % alphabet.length];
    ciphertext += newChar;
    }
    
  }
  return ciphertext;
};

const encryptVigenere = (plaintext, key) => {
  if (regex.test(key)) {
    let ciphertext = "";
    let keyIndex = 0;

    for (let i = 0; i < plaintext.length; i++) {
      const char = plaintext.charAt(i);

      // Jika karakter adalah spasi, tambahkan spasi ke teks terenkripsi
      if (char === ' ') {
        ciphertext += ' ';
      } else {
        // Ubah karakter kunci menjadi huruf kecil
        const lowercaseKey = key.charAt(keyIndex % key.length).toLowerCase();
        
        const newChar = alphabet[(alphabet.indexOf(char.toLowerCase()) + alphabet.indexOf(lowercaseKey)) % alphabet.length];
        
        // Jika karakter asli adalah huruf besar, ubah hasil enkripsi menjadi huruf besar juga
        if (char === char.toUpperCase()) {
          ciphertext += newChar.toUpperCase();
        } else {
          ciphertext += newChar;
        }
        
        keyIndex++;
      }
    }
    return ciphertext;
  } else {
    return "key harus huruf";
  }
};

const decryptVigenere = (ciphertext, key) => {
  if (regex.test(key)) {
    let plaintext = "";
    let keyIndex = 0;

    for (let i = 0; i < ciphertext.length; i++) {
      const char = ciphertext.charAt(i);

      // Jika karakter adalah spasi, tambahkan spasi ke teks terdekripsi
      if (char === ' ') {
        plaintext += ' ';
      } else {
        // Ubah karakter kunci menjadi huruf kecil
        const lowercaseKey = key.charAt(keyIndex % key.length).toLowerCase();
        
        const newCharIndex = (alphabet.indexOf(char.toLowerCase()) - alphabet.indexOf(lowercaseKey) + alphabet.length) % alphabet.length;
        const newChar = alphabet[newCharIndex];
        
        // Jika karakter dalam ciphertext adalah huruf besar, ubah hasil dekripsi menjadi huruf besar juga
        if (char === char.toUpperCase()) {
          plaintext += newChar.toUpperCase();
        } else {
          plaintext += newChar;
        }
        
        keyIndex++;
      }
    }
    return plaintext;
  } else {
    return "key harus huruf";
  }
};

const encryptRailFence = (plaintext, rails) => {
  if (rails < 2) {
    return plaintext;
  }

  const fence = new Array(rails).fill(0).map(() => []);
  let rail = 0;
  let direction = 1;

  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext.charAt(i);

    // Jika karakter adalah spasi, lanjutkan ke karakter berikutnya
    if (char === ' ') {
      continue;
    }

    fence[rail].push(char);

    if (rail === 0) {
      direction = 1;
    } else if (rail === rails - 1) {
      direction = -1;
    }

    rail += direction;
  }

  const ciphertext = fence.map(row => row.join('')).join('');

  return ciphertext;
};

const decryptRailFence = (ciphertext, rails) => {
  ciphertext = ciphertext.replace(/\s/g, '');
  if (rails < 2) {
    return ciphertext;
  }

  const fence = new Array(rails).fill(0).map(() => []);
  const railLengths = new Array(rails).fill(0);
  let rail = 0;
  let direction = 1;

  for (let i = 0; i < ciphertext.length; i++) {
    // Jika karakter adalah spasi, lanjutkan ke karakter berikutnya
    if (ciphertext.charAt(i) === ' ') {
      continue;
    }

    railLengths[rail]++;

    if (rail === 0) {
      direction = 1;
    } else if (rail === rails - 1) {
      direction = -1;
    }

    rail += direction;
  }

  let currentIndex = 0;

  for (let rail = 0; rail < rails; rail++) {
    for (let j = 0; j < railLengths[rail]; j++) {
      fence[rail].push(ciphertext.charAt(currentIndex));
      currentIndex++;
    }
  }

  let plaintext = '';
  rail = 0;
  direction = 1;

  for (let i = 0; i < ciphertext.length; i++) {
    const char = fence[rail].shift();

    // Jika karakter adalah spasi, tambahkan spasi ke teks terdekripsi
    if (char === ' ') {
      plaintext += ' ';
    } else {
      plaintext += char;
    }

    if (rail === 0) {
      direction = 1;
    } else if (rail === rails - 1) {
      direction = -1;
    }

    rail += direction;
  }

  return plaintext;
};

const encryptSuper = (plaintext, key) => {
  const ciphertextCaesar = caesarCipher(plaintext, 3);
  const ciphertextVigenere = encryptVigenere(ciphertextCaesar, key);
  const ciphertextRailFence = encryptRailFence(ciphertextVigenere, ciphertextVigenere.length); // Menggunakan jumlah karakter ciphertext sebagai jumlah rail
  return ciphertextRailFence;
};

const decryptSuper = (ciphertext, key) => {
  const plaintextRailFence = decryptRailFence(ciphertext, ciphertext.length); // Menggunakan panjang ciphertext sebagai jumlah rail
  const plaintextVigenere = decryptVigenere(plaintextRailFence, key);
  const plaintextCaesar = caesarCipher(plaintextVigenere, -3);
  return plaintextCaesar;
};

const init = () => {
  const menuLinks = document.querySelectorAll(".menu a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Menghindari navigasi ke halaman baru

      const contentDivs = document.querySelectorAll(".content > div");
      contentDivs.forEach((div) => {
        div.classList.remove("active");
      });

      const sectionId = link.getAttribute("data-section");

      const targetDiv = document.querySelector(`#${sectionId}`);
      if (targetDiv) {
        targetDiv.classList.add("active");
      }
    });
  });


  document.querySelector("#encrypt-caesar").addEventListener("click", () => {
    const plaintext = document.querySelector("#plaintext-caesar").value;
    const key = document.querySelector("#key-caesar").value;
    const ciphertext = caesarCipher(plaintext, key);
    document.querySelector("#result-caesar").innerHTML = ciphertext;
  });


  document.querySelector("#decrypt-caesar").addEventListener("click", () => {
    const ciphertext = document.querySelector("#plaintext-caesar").value;
    const key = 26-document.querySelector("#key-caesar").value;
    const plaintext = caesarCipher(ciphertext, key);
    document.querySelector("#result-caesar").innerHTML = plaintext;
  });

  document.querySelector("#encrypt-vigenere").addEventListener("click", () => {
    const plaintext = document.querySelector("#plaintext-vigenere").value;
    const key = document.querySelector("#key-vigenere").value;
    const ciphertext = encryptVigenere(plaintext, key);
    document.querySelector("#result-vigenere").innerHTML = ciphertext;
  });

  document.querySelector("#decrypt-vigenere").addEventListener("click", () => {
    const ciphertext = document.querySelector("#plaintext-vigenere").value;
    const key = document.querySelector("#key-vigenere").value;
    const plaintext = decryptVigenere(ciphertext, key);
    document.querySelector("#result-vigenere").innerHTML = plaintext;
  });

  document.querySelector("#encrypt-rail-fence").addEventListener("click", () => {
    const plaintext = document.querySelector("#plaintext-rail-fence").value;
    const rails = parseInt(document.querySelector("#rails").value); // Mengambil jumlah rails
    const ciphertext = encryptRailFence(plaintext, rails);
    document.querySelector("#result-rail-fence").innerHTML = ciphertext;
  });

  document.querySelector("#decrypt-rail-fence").addEventListener("click", () => {
    const ciphertext = document.querySelector("#plaintext-rail-fence").value;
    const rails = parseInt(document.querySelector("#rails").value); // Mengambil jumlah rails
    const plaintext = decryptRailFence(ciphertext, rails);
    document.querySelector("#result-rail-fence").innerHTML = plaintext;
  });

  document.querySelector("#encrypt-super").addEventListener("click", () => {
    const plaintext = document.querySelector("#plaintext-super").value;
    const key = document.querySelector("#key-super").value;
    const ciphertext = encryptSuper(plaintext, key);
    document.querySelector("#result-super").innerHTML = ciphertext;
  });

  document.querySelector("#decrypt-super").addEventListener("click", () => {
    const ciphertext = document.querySelector("#plaintext-super").value;
    const key = document.querySelector("#key-super").value;
    const plaintext = decryptSuper(ciphertext, key);
    document.querySelector("#result-super").innerHTML = plaintext;
  });
};

document.addEventListener("DOMContentLoaded", init);
