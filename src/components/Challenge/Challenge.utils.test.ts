import { digestMessage } from './Challenge.utils';

describe('Challenge.utils', () => {
  describe('digestMessage', () => {
    const mockedDigest = jest.fn();
    const originalCrypto = global.crypto;

    beforeAll(() => {
      const mockedCryto = { subtle: { digest: mockedDigest } };

      Object.defineProperty(window, 'crypto', {
        get() {
          return mockedCryto;
        },
      });
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    afterAll(() => {
      Object.defineProperty(window, 'crypto', originalCrypto);
    });

    it('converts a string into a digest', async () => {
      mockedDigest.mockResolvedValueOnce([112, 121, 116, 104, 111, 110]);
      const digest = await digestMessage('python');
      const expected = '707974686f6e';

      expect(digest).toBe(expected);
    });
  });
});
