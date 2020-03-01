import * as mongoose from 'mongoose';
import * as Stream from '../stream/stream.model'
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
let streamIdentifier;
beforeAll(async () => {
    const url = `mongodb://localhost:27017/tf_test_streams`;
    await mongoose.connect(url, options);
})
afterAll(async () => {
    await removeAllCollections();
})
describe('Routing and Integration Tests', () => {
    it('Should save stream to database', async done => {
        const response = await request.post('/stream').send({
            twitchUserName: 'blah',
            streamUrl: 'blah blah.com',
        });
        expect(response.status).toBe(200);
        expect(response.body[0].twitchUserName).toBeTruthy();
        done();
    });
    it('Should get stream from database', async done =>{
        const response = await request.get('/stream');
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
        let data = response.body;
        streamIdentifier = data[0]._id
        done();
    });
    it('Should update stream object in database', async done => {
        let objectId = new ObjectID(streamIdentifier);
        let data = {
            body: {
                twitchUserName: 'valid user',
                streamUrl: 'twitch.com/validuser',
                streamId: '1234'
            },
            params: {
                id: streamIdentifier
            }
        }
        const response = await request.patch(`/stream/${objectId}`).send(data);
        expect(response.status).toBe(200);
        done();
    })
});
