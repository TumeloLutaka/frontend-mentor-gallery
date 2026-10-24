// INTERACTOR (use case): load the challenges and put them in the right order.
// It receives the repository as an argument so it never needs to know
// where the data really comes from.

import { createChallenge } from "../entities/Challenge.js";

export async function fetchChallenges(challengeRepository) {
  const rawChallenges = await challengeRepository.getAll();

  const challenges = rawChallenges.map(createChallenge);

  // Newest challenge first (highest id at the top).
  return challenges.sort((a, b) => b.id - a.id);
}
