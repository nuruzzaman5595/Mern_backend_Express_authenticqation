const crypto = require('crypto');

const generateMockUser = (overrides = {}) => ({
  _id: crypto.randomUUID(),
  name: 'Test User',
  email: 'testuser@example.com',
  password: 'password123',
  isVerified: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

const generateMockToken = (payload = {}) => ({
  token: crypto.randomBytes(32).toString('hex'),
  payload: {
    id: crypto.randomUUID(),
    email: 'testuser@example.com',
    ...payload,
  },
});

module.exports = {
  generateMockUser,
  generateMockToken,
};
