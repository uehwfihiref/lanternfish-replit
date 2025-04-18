
function vigenereEncrypt(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const keyChar = key[i % key.length];
    const shift = keyChar.charCodeAt(0) - 97;
    const encrypted = String.fromCharCode((char.charCodeAt(0) + shift) % 128);
    result += encrypted;
  }
  return result;
}

function vigenereDecrypt(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const keyChar = key[i % key.length];
    const shift = keyChar.charCodeAt(0) - 97;
    const decrypted = String.fromCharCode((char.charCodeAt(0) - shift + 128) % 128);
    result += decrypted;
  }
  return result;
}

const CIPHER_KEY = 'lanternfish';

module.exports = {
  encrypt: (text) => vigenereEncrypt(text, CIPHER_KEY),
  decrypt: (text) => vigenereDecrypt(text, CIPHER_KEY)
};
