import { TextEncoder } from 'util';
import 'whatwg-fetch';

import { server } from './mocks/server';

beforeAll(() => {
  Object.defineProperty(window, 'crypto', {
    get() {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return { subtle: { digest: () => {} } };
    },
  });

  global.TextEncoder = TextEncoder;

  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
