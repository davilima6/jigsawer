export type Digest = string;

export type Challenge = {
  question: string;
  answerSha1: Digest;
  isAnswered?: boolean;
};

export type ChallengesData = {
  questions: Challenge[];
};

export type ChallengesMap = Map<Digest, Challenge>;
