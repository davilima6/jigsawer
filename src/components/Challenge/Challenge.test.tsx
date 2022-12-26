import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';

import { API_URL } from '../../constants';
import { server } from '../../mocks/server';
import Challenge from './Challenge';

describe('Challenge', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};
  const el = <Challenge isGameOver={false} onHit={noop} onMiss={noop} onTryAgain={noop} score={0} />;

  describe('data fetching', () => {
    it('displays a loading message while fetch is pending', async () => {
      render(el);
      expect(screen.getByText('Loading…')).toBeInTheDocument();
    });

    it('displays an error message when fetch fails', async () => {
      const fetchErrorMessage = 'Error in workflow';
      server.use(rest.get(API_URL, (_, res, ctx) => res(ctx.status(400), ctx.json(fetchErrorMessage))));
      render(el);
      await waitFor(() => {
        expect(screen.getByRole('main')).toHaveTextContent('An error has ocurred:');
        expect(screen.getByRole('main')).toHaveTextContent(fetchErrorMessage);
      });
    });

    it('asks a question if fetch succeeds', async () => {
      const question = 'Which director directed Gangs of New York?';

      render(el);

      await waitFor(() => {
        expect(screen.getByRole('main')).toHaveTextContent(question);
      });
    });
  });
});
