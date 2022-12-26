import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';

import {
  BUTTON_TITLE as ANSWER_BUTTON_TITLE,
  INPUT_PLACEHOLDER as ANSWER_INPUT_PLACEHOLDER,
} from '../../components/Answer/Answer';
import { TITLE as CHANCES_LEFT_TITLE } from '../../components/ChancesLeft/ChancesLeft';
import { BUTTON_LABEL as GAME_OVER_BUTTON_LABEL, TITLE as GAME_OVER_TITLE } from '../../components/GameOver/GameOver';
import { TITLE as SCORE_TITLE } from '../../components/Score/Score';
import { ENABLE_DARK_MODE_LABEL, ENABLE_LIGHT_MODE_LABEL } from '../../components/ThemeToggler/ThemeToggler';

import { API_URL } from '../../constants';
import * as fixtures from '../../mocks/fixtures.json';
import { server } from '../../mocks/server';
import App from './App';

function submitAnswer(formInput: HTMLElement, formButton: HTMLElement, answer: string): () => void {
  return () => {
    fireEvent.change(formInput, { target: { value: answer } });
    fireEvent.click(formButton);
  };
}

describe('App', () => {
  const mockedAnswerHash = [183, 148, 69, 177, 11, 213, 188, 52, 203, 235, 246, 51, 85, 16, 29, 189, 180, 32, 170, 14];
  let button: HTMLElement;
  let input: HTMLElement;
  let mockedDigest: jest.Mock;

  beforeAll(() => {
    mockedDigest = jest.fn();
    const mockedCryto = { subtle: { digest: mockedDigest } };

    Object.defineProperty(window, 'crypto', {
      get() {
        return mockedCryto;
      },
    });
  });

  describe('theming', () => {
    beforeAll(() => {
      document.body.dataset.theme = 'light';
    });

    it('loads light theme by default', () => {
      const { baseElement } = render(<App />);

      expect(baseElement).toHaveAttribute('data-theme', 'light');
      expect(screen.getByLabelText(ENABLE_DARK_MODE_LABEL)).toBeInTheDocument();
    });

    it('allows toggling between light and dark themes', async () => {
      const { baseElement } = render(<App />);

      fireEvent.click(await screen.findByLabelText(ENABLE_DARK_MODE_LABEL));
      expect(baseElement).toHaveAttribute('data-theme', 'dark');
      expect(screen.getByLabelText(ENABLE_LIGHT_MODE_LABEL)).toBeInTheDocument();
    });
  });

  describe('status reporting', () => {
    beforeEach(async () => {
      jest.clearAllMocks();
      render(<App />);
      input = await screen.findByPlaceholderText(ANSWER_INPUT_PLACEHOLDER);
      button = await screen.getByRole('button', { name: ANSWER_BUTTON_TITLE });
    });

    it('increases the score when a correct answer is provided', async () => {
      mockedDigest.mockResolvedValueOnce(mockedAnswerHash);
      const answer = 'Martin Scorsese';
      const score = (await screen.findByText(SCORE_TITLE)).closest('section');

      expect(score).toHaveTextContent('0');
      act(submitAnswer(input, button, answer));

      await waitFor(() => expect(score).toHaveTextContent('1'));
    });

    it('decreases chances left when a wrong answer is provided', async () => {
      mockedDigest.mockResolvedValueOnce([0, 1, 2]);
      const answer = 'Steven Spielberg';
      const chancesLeft = (await screen.findByText(CHANCES_LEFT_TITLE)).closest('section');

      expect(chancesLeft).toHaveTextContent('3');
      act(submitAnswer(input, button, answer));

      await waitFor(() => expect(chancesLeft).toHaveTextContent('2'));
    });
  });

  describe('rules of the game', () => {
    it('does not ask twice a question fetched twice', async () => {
      const [q0, q1] = fixtures.questions;
      const fixture = { questions: [q0, q0, q0, q0, q1] };
      server.use(rest.get(API_URL, (_, res, ctx) => res(ctx.status(200), ctx.json(fixture))));

      render(<App />);
      const input = await screen.findByPlaceholderText(ANSWER_INPUT_PLACEHOLDER);
      const button = await screen.getByRole('button', { name: ANSWER_BUTTON_TITLE });
      const answer = 'wrong answer';

      expect(screen.getByRole('main')).toHaveTextContent(q0?.question as string);
      await act(submitAnswer(input, button, answer));
      expect(screen.getByRole('main')).toHaveTextContent(q1?.question as string);
    });

    it('shows Game Over message after 3 wrong answers', async () => {
      render(<App />);
      const input = await screen.findByPlaceholderText(ANSWER_INPUT_PLACEHOLDER);
      const button = await screen.getByRole('button', { name: ANSWER_BUTTON_TITLE });
      const answer = 'wrong answer';

      await act(submitAnswer(input, button, answer));
      await act(submitAnswer(input, button, answer));
      await act(submitAnswer(input, button, answer));

      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(GAME_OVER_TITLE);
        expect(screen.getByRole('button')).toHaveTextContent(GAME_OVER_BUTTON_LABEL);
      });
    });

    it('allows to restart playing after Game Over', async () => {
      render(<App />);
      const input = await screen.findByPlaceholderText(ANSWER_INPUT_PLACEHOLDER);
      const button = await screen.getByRole('button', { name: ANSWER_BUTTON_TITLE });
      const answer = 'wrong answer';

      await act(submitAnswer(input, button, answer));
      await act(submitAnswer(input, button, answer));
      await act(submitAnswer(input, button, answer));

      await waitFor(async () => {
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(GAME_OVER_TITLE);
        screen.getByRole('button', { name: GAME_OVER_BUTTON_LABEL }).click();
        expect(await screen.findByRole('button', { name: GAME_OVER_BUTTON_LABEL })).not.toBeInTheDocument();
      });
    });
  });
});
