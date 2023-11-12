// for encryption and decryption
import CryptoJS from "crypto-js";

// for secure local storage
import secureLocalStorage from "react-secure-storage";

// encrypt refresh token
export function encrypt(message, secretKey) {
  let ciphertext = null;
  try {
    ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
  } catch (err) {
    console.log("Encrypt secret key error:", err);
  }

  return ciphertext;
}

// decrypt refresh token
export function decrypt(ciphertext, secretKey) {
  let plaintext = null;
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    plaintext = bytes.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.log("Decrypt secret key error", err);
  }
  return plaintext;
}

// store refresh token in secure local storage
export function storeRefreshToken(refreshToken) {
  localStorage.setItem("username", "admin");
  secureLocalStorage.setItem(
    process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX,
    refreshToken
  );
}

// get refresh token from secure local storage
export async function getRefreshToken() {
  const refreshToken = secureLocalStorage.getItem(
    process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX
  );
  return refreshToken;
}

// remove refresh token from secure local storage
export function removeRefreshToken() {
  secureLocalStorage.removeItem(
    process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX
  );
}

// secure refresh token in secure local storage
export function secureRefreshToken(refreshToken) {
  const encryptedRefreshToken = encrypt(
    refreshToken,
    process.env.NEXT_PUBLIC_SECRET_KEY
  );
  storeRefreshToken(encryptedRefreshToken);
}

// get unencrypted refresh token from secure local storage
export async function getDecryptedRefreshToken() {
  const encryptedRefreshToken = await getRefreshToken();
  const decryptedRefreshToken = decrypt(
    encryptedRefreshToken,
    process.env.NEXT_PUBLIC_SECRET_KEY
  );
  return decryptedRefreshToken;
}