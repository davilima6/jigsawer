import { ChallengesData, ChallengesMap } from '../../types';

export function updateChallenges(challengesMap: ChallengesMap, questions: ChallengesData['questions']): ChallengesMap {
  const challengesUpdated = questions.reduce<ChallengesMap>((challenges, q) => {
    if (!challengesMap.has(q.question)) {
      challenges.set(q.question, { ...q, isAnswered: false });
    }

    return challenges;
  }, new Map(challengesMap));

  return challengesUpdated;
}
