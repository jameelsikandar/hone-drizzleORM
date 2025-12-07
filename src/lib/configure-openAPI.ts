import { AppOpenAPI } from '@/types/allTypes';
import packageJSON from '../../package.json';
import { Scalar } from '@scalar/hono-api-reference';

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Tasks API',
    },
  });

  app.get(
    '/reference',
    Scalar({
      theme: 'kepler',
      layout: 'classic',
      defaultHttpClient: {
        targetKey: 'js',
        clientKey: 'fetch',
      },
      url: '/doc',
    }),
  );
}
