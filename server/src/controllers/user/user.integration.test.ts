import * as mongoose from 'mongoose';
import * as User from '../user/user.model'
import { ObjectID } from 'mongodb';
const supertest = require('supertest');
const app = require('../../testserver');
const request = supertest(app);

const options: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoCreate: true
  };
  async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany({});
    }
  }

beforeAll(async () => {
    const url = `mongodb://localhost:27017/tf_test_users`;
    await mongoose.connect(url, options);
});
afterAll(async () => {
    await removeAllCollections();
});
let uniqueId;
describe('Routing and Integration Tests', () => {
    it('Should save user to database', async done => {
        const response = await request.post('/user').send({
            firstName: "johnny",
            lastName: "test",
            email: "johnnytesting@gmail.com",
            twitchUsername: "jtTwitch",
            userId: '1234'
        });
        expect(response.status).toBe(200);
        expect(response.body[0].twitchUsername).toBe('jtTwitch');
        done();
    });
    it('Should get user from database', async done =>{
        const response = await request.get('/user');
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
        let data = response.body;
        uniqueId = data[0]._id;
        done();
    });
    it('Should update user in database', async done => {
        let objectId = new ObjectID(uniqueId);
        let data = {
            body: {
                firstName: "donny",
                lastName: "death",
                email: "iamdonnynow@gmail.com",
                twitchUsername: "twitchRat",
                userId: "1234"
            },
            params: {
                id: uniqueId
            }
        }
        const response = await request.patch(`/user/${objectId}`).send(data);
        expect(response.status).toBe(200);

        done();
    });
    it('Should delete user in database', async done=> {
        let objectId = new ObjectID(uniqueId);
        const response = await request.delete(`/user/${objectId}`);
        expect(response.status).toBe(204);
        done();
    })
});
