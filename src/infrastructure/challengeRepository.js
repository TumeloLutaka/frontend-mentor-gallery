// INFRASTRUCTURE: talks to the outside world (the network).
// If the data ever moves to an API, only this file needs to change.

export const challengeRepository = {
  async getAll() {
    const response = await fetch(`${import.meta.env.BASE_URL}data/content.json`);

    if (!response.ok) {
      throw new Error(`Could not load challenges (status ${response.status})`);
    }

    return response.json();
  },
};
