import { OpenAPIHono } from '@hono/zod-openapi';
import { PinoLogger, pinoLogger } from 'hono-pino';
import pino from 'pino';
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';
import { PinoPretty } from 'pino-pretty';
import env from '../../env';
import { AppBindings } from '@/types/allTypes';
import { defaultHook } from 'stoker/openapi';

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(serveEmojiFavicon('🧭'));
  app.use(
    pinoLogger({
      pino: pino(
        {
          level: env.LOG_LEVEL || 'info',
        },
        env.NODE_ENV === 'production' ? undefined : PinoPretty(),
      ),
      http: {
        reqId: () => crypto.randomUUID(),
      },
    }),
  );

  app.notFound(notFound);
  app.onError(onError);
  return app;
}
