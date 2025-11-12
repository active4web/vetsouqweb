import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_KEY;

// Data Encryption
export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decryption
export const decryptData = (encryptedData) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch {
        return null;
    }
};

// Save Token
export const setUserToken = (userData) => {
    const encryptedData = encryptData(userData);
    Cookies.set("token", encryptedData);
};

// Get Token
export const getUserToken = () => {
    const encryptedData = Cookies.get("token");
    return encryptedData ? decryptData(encryptedData) : null;
};

// Remove Token
export const removeUserToken = () => {
    Cookies.remove("token");
};