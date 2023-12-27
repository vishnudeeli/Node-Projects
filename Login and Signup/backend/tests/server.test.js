const request = require('supertest');
const app = require('../server');

describe('POST /signup', () => {
  it('should create a new user and return a success message', async () => {
    const response = await request(app)
      .post('/signup')
      .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Signup successful' });
  });

  // Add more test cases to cover different scenarios
});

describe('POST /login', () => {
  it('should log in a user and return a success message', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'john@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Success' });
  });

  // Add more test cases to cover different scenarios
});
