import CryptoJS from 'crypto-js';

const getSecretKey = () => {
  return process.env.REACT_APP_ENCRYPTION_KEY || 'default_fallback_offline_secret_key_123!';
};

export const queueCrypto = {
  encryptPayload: (payload) => {
    if (!payload) return payload;
    try {
      const jsonStr = JSON.stringify(payload);
      return CryptoJS.AES.encrypt(jsonStr, getSecretKey()).toString();
    } catch (error) {
      console.error('Queue encryption failed:', error);
      throw new Error('Encryption failed');
    }
  },

  decryptPayload: (encryptedPayload) => {
    if (!encryptedPayload) return encryptedPayload;
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedPayload, getSecretKey());
      const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedStr);
    } catch (error) {
      console.error('Queue decryption failed:', error);
      throw new Error('Decryption failed');
    }
  }
};
