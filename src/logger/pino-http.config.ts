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
      translateTime: 'UTC:yyyy-mm-dd HH:MM:ss.l o',
      messageFormat: `{context} - {msg}`,
    } as PrettyOptions,
  },
};
