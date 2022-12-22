import { TextEncoder } from 'util';
import 'whatwg-fetch';

import { server } from './mocks/server';

beforeAll(() => {
  Object.defineProperty(window, 'crypto', {
    get() {
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
