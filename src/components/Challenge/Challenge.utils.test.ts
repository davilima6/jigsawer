import { digestMessage } from './Challenge.utils';

describe('Challenge.utils', () => {
  describe('digestMessage', () => {
    const originalCrypto = global.crypto;
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

    afterAll(() => {
      Object.defineProperty(window, 'crypto', originalCrypto);
    });

    it('converts a string into a digest', async () => {
      const mockedAnswerHash = [112, 121, 116, 104, 111, 110];
      mockedDigest.mockResolvedValueOnce(mockedAnswerHash);

      expect(await digestMessage('python')).toBe('707974686f6e');
    });
  });
});
