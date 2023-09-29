const alphabet = "abcdefghijklmnopqrstuvwxyz";

const encryptCaesar = (plaintext, key) => {
  let ciphertext = '';
  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext.charAt(i);
    const newChar = alphabet[(alphabet.indexOf(char) + key) % alphabet.length];
    ciphertext += newChar;
  }
  return ciphertext;
};

const decryptCaesar = (ciphertext, key) => {
  return encryptCaesar(ciphertext, -key);
};

const encryptVigenere = (plaintext, key) => {
  let ciphertext = '';
  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext.charAt(i);
    const newChar = alphabet[(alphabet.indexOf(char) + alphabet.indexOf(key.charAt(i % key.length))) % alphabet.length];
    ciphertext += newChar;
  }
  return ciphertext;
};

const decryptVigenere = (ciphertext, key) => {
  return encryptVigenere(ciphertext, key.split("").reverse().join(""));
};

const encryptRailFence = (plaintext, rails) => {
  if (rails < 2) {
    return plaintext; 
  }

  const fence = new Array(rails).fill(0).map(() => []);
  let rail = 0;
  let direction = 1;

  for (let i = 0; i < plaintext.length; i++) {
    fence[rail].push(plaintext.charAt(i));
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
  if (rails < 2) {
    return ciphertext; // Tidak ada dekripsi jika jumlah rel kurang dari 2
  }

  const fence = new Array(rails).fill(0).map(() => []);
  const railLengths = new Array(rails).fill(0);
  let rail = 0;
  let direction = 1;

  for (let i = 0; i < ciphertext.length; i++) {
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
    plaintext += fence[rail].shift();

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
  const ciphertextCaesar = encryptCaesar(plaintext, 3);
  const ciphertextVigenere = encryptVigenere(ciphertextCaesar, key);
  const ciphertextRailFence = encryptRailFence(ciphertextVigenere, 3)
  return ciphertextRailFence;
};

const decryptSuper = (ciphertext, key) => {
  const plaintextRailFence = decryptRailFence(ciphertext, 3);
  const plaintextVigenere = decryptVigenere(plaintextRailFence, key.split("").reverse().join(""));
  const plaintextCaesar = decryptCaesar(plaintextVigenere, -3);
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
    const ciphertext = encryptCaesar(plaintext, key);
    document.querySelector("#ciphertext-caesar").innerHTML = ciphertext;
  });


  document.querySelector("#decrypt-caesar").addEventListener("click", () => {
    const ciphertext = document.querySelector("#ciphertext-caesar").innerHTML;
    const key = document.querySelector("#key-caesar").value;
    const plaintext = decryptCaesar(ciphertext, key);
    document.querySelector("#plaintext-caesar-decrypt").innerHTML = plaintext;
  });

  document.querySelector("#encrypt-vigenere").addEventListener("click", () => {
    const plaintext = document.querySelector("#plaintext-vigenere").value;
    const key = document.querySelector("#key-vigenere").value;
    const ciphertext = encryptVigenere(plaintext, key);
    document.querySelector("#ciphertext-vigenere").innerHTML = ciphertext;
  });

  document.querySelector("#decrypt-vigenere").addEventListener("click", () => {
    const ciphertext = document.querySelector("#ciphertext-vigenere").innerHTML;
    const key = document.querySelector("#key-vigenere").value;
    const plaintext = decryptVigenere(ciphertext, key);
    document.querySelector("#plaintext-vigenere-decrypt").innerHTML = plaintext;
  });

  document.querySelector("#encrypt-rail-fence").addEventListener("click", () => {
    const plaintext = document.querySelector("#plaintext-rail-fence").value;
    const rails = parseInt(document.querySelector("#rails").value); // Mengambil jumlah rails
    const ciphertext = encryptRailFence(plaintext, rails);
    document.querySelector("#ciphertext-rail-fence").innerHTML = ciphertext;
  });

  document.querySelector("#decrypt-rail-fence").addEventListener("click", () => {
    const ciphertext = document.querySelector("#ciphertext-rail-fence").innerHTML;
    const rails = parseInt(document.querySelector("#rails").value); // Mengambil jumlah rails
    const plaintext = decryptRailFence(ciphertext, rails);
    document.querySelector("#plaintext-rail-fence-decrypt").innerHTML = plaintext;
  });

  document.querySelector("#encrypt-super").addEventListener("click", () => {
    const plaintext = document.querySelector("#plaintext-super").value;
    const key = document.querySelector("#key-super").value;
    const ciphertext = encryptSuper(plaintext, key);
    document.querySelector("#ciphertext-super").innerHTML = ciphertext;
  });

  document.querySelector("#decrypt-super").addEventListener("click", () => {
    const ciphertext = document.querySelector("#ciphertext-super").innerHTML;
    const key = document.querySelector("#key-super").value;
    const plaintext = decryptSuper(ciphertext, key);
    document.querySelector("#plaintext-super-decrypt").innerHTML = plaintext;
  });
};

document.addEventListener("DOMContentLoaded", init);
