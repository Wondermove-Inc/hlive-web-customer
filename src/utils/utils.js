import * as CryptoJS from 'crypto-js';

// 'Your reservation history email has been sent to the $ address you entered.'
export const displayString = (stringText, replaceString) => stringText.replace('$', replaceString);

// 'We look forward to seeing you on $-#.'
export const displayStringWithChangeTwoWord = (stringText, replaceString, replaceString2) => {
  // text.replace('$', replaceString);
  // text.replace('#', replaceString2);
  return stringText.replace('$', replaceString).replace('#', replaceString2);
};

export const encryptData = async (data) => {
  const firstSaltKey = 'XeCCQcIzySskw0SQcqfj';
  const secondSaltKey = 'E1iL02mFmck25GalMHD5'.substring(4, 17);

  const cryptoTest = CryptoJS.AES.encrypt(JSON.stringify(data), firstSaltKey).toString();

  const encryptAgain = CryptoJS.AES.encrypt(cryptoTest, secondSaltKey).toString();

  return encryptAgain;
};
