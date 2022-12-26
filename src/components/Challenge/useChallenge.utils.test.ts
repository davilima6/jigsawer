import { ChallengesData, ChallengesMap } from '../../types';
import { updateChallenges } from './useChallenge.utils';

describe('useChallenge.utils', () => {
  describe('updateChallenges', () => {
    let challengesMap: ChallengesMap;
    let questions: ChallengesData['questions'];

    beforeEach(() => {
      challengesMap = new Map(
        Object.entries({
          'Who?': { question: 'Who?', answerSha1: '0', isAnswered: true },
          'What?': { question: 'What?', answerSha1: '1', isAnswered: true },
          'When?': { question: 'Who?', answerSha1: '2', isAnswered: false },
        })
      );
      questions = [
        { question: 'When?', answerSha1: '2' },
        { question: 'Where?', answerSha1: '3' },
        { question: 'Why?', answerSha1: '4' },
      ];
    });

    it('returns a challenges map updated with new questions', () => {
      expect(updateChallenges(challengesMap, questions)).toEqual(
        new Map(
          Object.entries({
            'Who?': { question: 'Who?', answerSha1: '0', isAnswered: true },
            'What?': { question: 'What?', answerSha1: '1', isAnswered: true },
            'When?': { question: 'Who?', answerSha1: '2', isAnswered: false },
            'Where?': { question: 'Where?', answerSha1: '3', isAnswered: false },
            'Why?': { question: 'Why?', answerSha1: '4', isAnswered: false },
          })
        )
      );
    });

    it('does not mutate the provided parameters', () => {
      const challengesMapCloned = new Map(challengesMap);
      const questionsCloned = JSON.parse(JSON.stringify(questions));

      updateChallenges(challengesMap, questions);

      expect(challengesMap).toEqual(challengesMapCloned);
      expect(questions).toEqual(questionsCloned);
    });
  });
});
