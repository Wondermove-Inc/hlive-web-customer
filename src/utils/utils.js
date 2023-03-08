// 'Your reservation history email has been sent to the $ address you entered.'
export const displayString = (stringText, replaceString) => stringText.replace('$', replaceString);

// 'We look forward to seeing you on $-#.'
export const displayStringWithChangeTwoWord = (stringText, replaceString, replaceString2) => {
  // text.replace('$', replaceString);
  // text.replace('#', replaceString2);
  return stringText.replace('$', replaceString).replace('#', replaceString2);
};
