import { rest } from 'msw';

import { API_URL } from '../constants';
import * as fixtures from './fixtures.json';

export const handlers = [
  rest.get(API_URL, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(fixtures));
  }),
];
