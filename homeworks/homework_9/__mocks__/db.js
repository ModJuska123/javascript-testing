// __mocks__/db.js

// Mocked implementation of the database pool

const mockPool = {
    connect: jest.fn(),
    release: jest.fn(),
  };
  
  // Mocked query function that returns mock data

  const mockQuery = jest.fn().mockResolvedValue({
    rows: [{ 
        amount: 100, 
        userFrom: 1, 
        userTo: 2  
    }, {
        amount: 1100, 
        userFrom: 1, 
        userTo: 2  
    }],
  });
  
  // Mocked implementation of the pool's connect method
  mockPool.connect.mockResolvedValue({
    query: mockQuery,
  });
  mockPool.release.mockResolvedValue({
    query: mockQuery,
  });
  module.exports = mockPool;
  


























  
// __mocks__/db.js

// const mockPool = {
//   connect: jest.fn().mockImplementation((query, values) => {
//       // Assuming the query is for selecting todos
//       if (query.startsWith('SELECT')) {
//           return Promise.resolve({
//               rows: [
//                   {
//                     amount: 100, userFrom: 1, userTo: 2
//                   },
//               ]
//           });
//       }
//       // Add other conditions for different types of queries as needed
//   })
// };

// module.exports = mockPool;