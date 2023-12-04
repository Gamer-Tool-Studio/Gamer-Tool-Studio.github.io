export const getWordPattern = (inputString: string, pattern: RegExp): string => {
  const match = inputString.match(pattern);
  console.log(inputString, match);

  return match?.[1] || '';
};
