import { useEffect, useState } from 'react';

import { API_URL } from '../../constants';
import type { Challenge, ChallengesData, ChallengesMap } from '../../types';
import { updateChallenges } from './useChallenge.utils';

type UseChallenge = {
  error: string | null;
  loading: boolean;
  value: Challenge | undefined;
};

export function useChallenge(): UseChallenge {
  const [challengesMap, setChallengesMap] = useState<ChallengesMap>(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<UseChallenge['error']>(null);
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    async function getChallenges(): Promise<void> {
      setError(null);
      setLoading(true);

      try {
        const data = await fetch(API_URL);

        if (!data.ok) {
          throw new Error(await data.text());
        }

        const { questions } = (await data.json()) as ChallengesData;

        setChallengesMap((challengesMapPrev) => updateChallenges(challengesMapPrev, questions));
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        setError(`Could not fetch challenges. (${message})`);
      } finally {
        setLoading(false);
      }
    }

    getChallenges();
  }, [refreshToken]);

  const challenge = Array.from(challengesMap.values()).find((challenge) => !challenge.isAnswered);

  useEffect(() => {
    if (challengesMap.size > 0 && !challenge) {
      setRefreshToken((prev) => prev + 1);
    }
  }, [challengesMap.size, challenge]);

  return { error, loading, value: challenge };
}
