// __mocks__/db.js

// Mocked implementation of the database pool
const mockPool = {
    connect: jest.fn(),
  };
  
  // Mocked query function that returns mock data
  const mockQuery = jest.fn().mockResolvedValue({
    rows: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }],
  });
  
  // Mocked implementation of the pool's connect method
  mockPool.connect.mockResolvedValue({
    query: mockQuery,
  });
  
  module.exports = mockPool;
  