import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { MotionConfig } from 'framer-motion';
import AppRoutes from '../src/routes/AppRoutes';
import { FavoritesProvider } from '../src/hooks/useFavorites';
import { ToastProvider } from '../src/hooks/useToast';

/** Renders a route to HTML, waiting until all lazy pages have resolved. */
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = '';
    const sink = new PassThrough();
    sink.on('data', (c) => (html += c));
    sink.on('end', () => resolve(html));
    const stream = renderToPipeableStream(
      <MotionConfig reducedMotion="user">
        <StaticRouter location={url}>
          <FavoritesProvider>
            <ToastProvider>
              <AppRoutes />
            </ToastProvider>
          </FavoritesProvider>
        </StaticRouter>
      </MotionConfig>,
      { onAllReady: () => stream.pipe(sink), onShellError: reject, onError: reject },
    );
  });
}
