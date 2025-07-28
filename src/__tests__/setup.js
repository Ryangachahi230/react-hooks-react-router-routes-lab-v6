import { vi } from 'vitest';

global.fetch = vi.fn();

beforeEach(() => {
  fetch.mockReset();
  fetch.mockImplementation((url) => {
    if (url === 'http://localhost:3000/movies') {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, title: 'Doctor Strange', time: 115, genres: ['Action', 'Adventure', 'Fantasy'] },
            { id: 2, title: 'Trolls', time: 92, genres: ['Animation', 'Comedy'] },
            { id: 3, title: 'Moonlight', time: 111, genres: ['Drama'] },
          ]),
      });
    }
    if (url === 'http://localhost:3000/movies/1') {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            id: 1,
            title: 'Doctor Strange',
            time: 115,
            genres: ['Action', 'Adventure', 'Fantasy'],
          }),
      });
    }
    if (url === 'http://localhost:3000/actors') {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, name: 'Benedict Cumberbatch', movies: ['Doctor Strange', 'The Imitation Game', 'Black Mass'] },
            { id: 2, name: 'Justin Timberlake', movies: ['Trolls', 'Friends with Benefits', 'The Social Network'] },
            { id: 3, name: 'Anna Kendrick', movies: ['Pitch Perfect', 'Into The Wood'] },
            { id: 4, name: 'Tom Cruise', movies: ['Jack Reacher: Never Go Back', 'Mission Impossible 4', 'War of the Worlds'] },
          ]),
      });
    }
    if (url === 'http://localhost:3000/directors') {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, name: 'Scott Derrickson', movies: ['Doctor Strange', 'Sinister', 'The Exorcism of Emily Rose'] },
            { id: 2, name: 'Mike Mitchell', movies: ['Trolls', 'Alvin and the Chipmunks: Chipwrecked', 'Sky High'] },
            { id: 3, name: 'Edward Zwick', movies: ['Jack Reacher: Never Go Back', 'Blood Diamond', 'The Siege'] },
          ]),
      });
    }
    return Promise.reject(new Error('Unknown URL'));
  });
});