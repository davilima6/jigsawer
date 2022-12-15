import { useEffect, useState } from 'react';

import { API_URL } from '../../constants';
import type { Challenge } from '../../types';

type ChallengesResponse = {
  questions: Challenge[];
};

type QueryResult<T = []> = {
  value: T | null;
  error: string | null;
  loading: boolean;
};

export function useChallenges(): QueryResult<Challenge[]> {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<QueryResult['error']>(null);

  useEffect(() => {
    async function getChallenges(): Promise<void> {
      setError(null);
      setLoading(true);

      try {
        const data = await fetch(API_URL);
        const { questions } = (await data.json()) as ChallengesResponse;

        setChallenges(questions);
      } catch (e) {
        setError('Could not fetch challenges');
      } finally {
        setLoading(false);
      }
    }

    getChallenges();
  }, []);

  return { error, loading, value: challenges };
}
