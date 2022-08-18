process.env.environment = 'test';
const { dbConnect, dbDisconnect } = require('../utils/database/handler.js');
const supertest = require('supertest');
const server = require('../app');
const { profileList } = require('../utils/database/seeds/profile_seeder.js');
const baseURL = "http://localhost:3002"

beforeAll(async () => {
    await dbConnect();
})

const chapelle = '62fcf868e4b798642b6a943a';
const jonah = '62fc66653157de81b260aa13';
describe('Test Routes', () => {
    // Profile Routes
    test("Get profile should return 200", async () => {
        const response = await supertest(server).get('/');
        expect(response.statusCode).toBe(200);
    });

    test("GET profile by ID should return 200", async () => {
        const mj = '50e9660f-91d6-47a6-9458-5ffc4c00b345';
        const response = await supertest(server).get(`/${mj}`);
        expect(response.statusCode).toBe(200);
    });

    test("POST Profile should return redirect", async () => {
        const newProfile = profileList[0];
        const response = await supertest(server).post('/').send(newProfile);
        expect(response.statusCode).toBe(302);
    });

    // User Routes
    test("GET user should return 200 and data array", async () => {
        const response = await supertest(server).get('/api/user');
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.message).toBe('Users Retrieved');
    });

    test("POST user should return 200", async () => {
        const newUser = {
            name: 'David',
        }
        const response = await supertest(server).post('/api/user').send(newUser);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User Created');
    });

    // Celebrity Routes
    test("Get Celebrity List should return 200 and contain array", async () => {
        const response = await supertest(server).get('/api/celebrity');
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.message).toBe('Celebrities retrieved');
    });
    test("Get Celebrity by ID should return 200 and contain dave Chapelle", async () => {
        const response = await supertest(server).get(`/api/celebrity/${chapelle}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Celebrity retrieved');
        expect(response.body.data.name).toBe('Dave Chapelle');
    });
    test("POST Comment List should return 200 and contain celebrity id", async () => {
        const vote = {
            title: 'He is cool',
            description: 'cool description',
            mbti: 'infj',
            enneagram: 'e1w2',
            zodiac: 'aquarius',
        };
        const response = await supertest(server).post(`/api/celebrity/comment/${chapelle}/${jonah}`).send(vote);
        expect(response.statusCode).toBe(200);
        expect(response.body.data.celebrity).toBe(chapelle);
        expect(response.body.message).toBe('Comment Created');
    });
    test("Get Celebrity List should return 200 and contain array", async () => {
        const params = {
            mbti: 'infj',
            enneagram: 'e1w2',
            zodiac: 'aquarius',
            sort: 'best',
        };
        const response = await supertest(server).get(`/api/celebrity/votes/${chapelle}`).send(params);
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.message).toBe('Votes retrieved');
    });
    test("PUT like comment should return 200 and contain expected message", async () => {
        const like = {
            id: 'ertt1726uu87', //Comment id, test comment created in comment_seeder.js
            user: jonah,
        };
        const response = await supertest(server).put('/api/celebrity/votes/like').send(like);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Comment liked/Unliked');
    });
});

afterAll(async () => {
    await dbDisconnect()
})