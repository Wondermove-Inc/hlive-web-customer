import * as CryptoJS from 'crypto-js';

export const encryptData = async (data) => {
  const firstSaltKey = 'XeCCQcIzySskw0SQcqfj';
  const secondSaltKey = 'E1iL02mFmck25GalMHD5'.substring(4, 17);

  const cryptoTest = CryptoJS.AES.encrypt(JSON.stringify(data), firstSaltKey).toString();

  const encryptAgain = CryptoJS.AES.encrypt(cryptoTest, secondSaltKey).toString();

  return encryptAgain;
};
