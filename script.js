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

const encryptDES = (plaintext, key) => {
  return plaintext;
};

const decryptDES = (ciphertext, key) => {
  return ciphertext;
};

const encryptSuper = (plaintext, key) => {
  const ciphertextCaesar = encryptCaesar(plaintext, 3);
  const ciphertextVigenere = encryptVigenere(ciphertextCaesar, key);
  const ciphertextDES = encryptDES(ciphertextVigenere, key);
  return ciphertextDES;
};

const decryptSuper = (ciphertext, key) => {
  const plaintextDES = decryptDES(ciphertext, key);
  const plaintextVigenere = decryptVigenere(plaintextDES, key.split("").reverse().join(""));
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

  document.querySelector("#encrypt-des").addEventListener("click", () => {
    const plaintext = document.querySelector("#plaintext-des").value;
    const key = document.querySelector("#key-des").value;
    const ciphertext = encryptDES(plaintext, key);
    document.querySelector("#ciphertext-des").innerHTML = ciphertext;
  });

  document.querySelector("#decrypt-des").addEventListener("click", () => {
    const ciphertext = document.querySelector("#ciphertext-des").innerHTML;
    const key = document.querySelector("#key-des").value;
    const plaintext = decryptDES(ciphertext, key);
    document.querySelector("#plaintext-des-decrypt").innerHTML = plaintext;
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
