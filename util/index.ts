export const getWordPattern = (inputString: string, pattern: RegExp): string => {
  const match = inputString.match(pattern);
  return match?.[1] || '';
};

export const formatTokens = (tokens: number) => {
  if (tokens >= 1000000) {
    return `${tokens / 1000000}M`;
  } else if (tokens >= 1000) {
    return `${tokens / 1000}K`;
  } else {
    return `${tokens}`;
  }
};
