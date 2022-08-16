/* istanbul ignore file */

import { PrettyOptions } from 'pino-pretty';

export const pinoHttpOptions = {
  customProps: () => ({
    context: 'HTTP',
  }),
  autoLogging: true,
  transport: {
    target: 'pino-pretty',
    level: 'trace',
    options: {
      colorize: true,
      levelFirst: true,
      hideObject: true,
      translateTime: 'SYS:standard',
      messageFormat: `{context} - {msg}`,
    } as PrettyOptions,
  },
};
