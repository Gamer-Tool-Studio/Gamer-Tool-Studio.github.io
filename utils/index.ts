export function getWordPattern(inputString: string, pattern: RegExp): string {
  const match = inputString.match(pattern)
  return match?.[1] || ''
}

export function formatTokens(tokens: number) {
  if (tokens >= 1000000) {
    // round to 2 decimal places
    const rounded = Math.round((tokens / 1000000) * 100) / 100
    return `${rounded}M`
  }
  else if (tokens >= 1000) {
    const rounded = Math.round((tokens / 1000) * 100) / 100

    return `${rounded}K`
  }
  else {
    return `${tokens}`
  }
}
