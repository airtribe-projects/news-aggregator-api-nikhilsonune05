const tap = require('tap');
const supertest = require('supertest');
const app = require('../app');
const server = supertest(app);

const mockUser = {
  name: 'Clark Kent',
  email: 'clarkasd4f@superman.com',
  password: 'Krypt()n8'
};

let token = '';

tap.test('POST /api/v1/user/register - signup', async (t) => {
  const response = await server.post('/api/v1/user/register').send(mockUser);
  t.equal(response.status, 201, 'User registered');
});

tap.test('POST /api/v1/user/register - missing email', async (t) => {
  const response = await server.post('/api/v1/user/register').send({
    name: mockUser.name,
    password: mockUser.password
  });
  t.equal(response.status, 400, 'Missing email returns 400');
});

tap.test('POST /api/v1/user/login - login success', async (t) => {
  const response = await server.post('/api/v1/user/login').send({
    email: mockUser.email,
    password: mockUser.password
  });
  t.equal(response.status, 200, 'Login success');
  t.ok(response.body.token, 'Token received');
  token = response.body.token;
});

tap.test('POST /api/v1/user/login - wrong password', async (t) => {
  const response = await server.post('/api/v1/user/login').send({
    email: mockUser.email,
    password: 'wrongpassword'
  });
  t.equal(response.status, 401, 'Wrong password rejected');
});

tap.test('GET /api/v1/user/preferences - get preferences', async (t) => {
  const response = await server.get('/api/v1/preferences').set('Authorization', `Bearer ${token}`);
  t.equal(response.status, 200, 'Preferences fetched');
  t.ok(response.body.preferences, 'Preferences object present');
});

tap.test('GET /api/v1/user/preferences - no token', async (t) => {
  const response = await server.get('/api/v1/preferences');
  t.equal(response.status, 401, 'No token returns 401');
});

tap.test('PUT /api/v1/user/preferences - update preferences', async (t) => {
  const newPrefs = {
    categories: ['movies', 'comics', 'games'],
    languages: ['en', 'es']
  };
  const response = await server.put('/api/v1/preferences')
    .set('Authorization', `Bearer ${token}`)
    .send(newPrefs);
  t.equal(response.status, 200, 'Preferences updated');
  t.same(response.body.preferences.categories, newPrefs.categories);
  t.same(response.body.preferences.languages, newPrefs.languages);
});

tap.test('GET /api/v1/preferences - verify updated', async (t) => {
  const response = await server.get('/api/v1/preferences').set('Authorization', `Bearer ${token}`);
  t.equal(response.status, 200);
  t.same(response.body.preferences.categories, ['movies', 'comics', 'games']);
  t.same(response.body.preferences.languages, ['en', 'es']);
});

tap.test('GET /api/v1/news - fetch news', async (t) => {
  const response = await server.get('/api/v1/news').set('Authorization', `Bearer ${token}`);
  t.equal(response.status, 200);
  t.ok(response.body.news, 'News received');
});

tap.test('GET /api/v1/news - no token', async (t) => {
  const response = await server.get('/api/v1/news');
  t.equal(response.status, 401, 'Unauthorized news access');
});
