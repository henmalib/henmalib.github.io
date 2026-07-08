import type {MiddlewareHandler} from 'astro';
import curlText from '../scripts/generated/index.txt?raw';

export const onRequest: MiddlewareHandler = ({request, url}, next) => {
  const userAgent = request.headers.get('user-agent') ?? '';

  if (url.pathname === '/' && /\bcurl\b/i.test(userAgent)) {
    return new Response(curlText, {
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        vary: 'user-agent'
      }
    });
  }

  return next();
};
