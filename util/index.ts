export const getWordPattern = (inputString: string, pattern: RegExp): string => {
  const match = inputString.match(pattern);
  return match?.[1] || '';
};
