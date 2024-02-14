import debug from 'debug'

const name = 'GTS'

export function getDebugger(moduleName: string) {
  return {
    error: debug(`${name}:error:${moduleName}`),
    log: debug(`${name}:${moduleName}`),
  }
}
