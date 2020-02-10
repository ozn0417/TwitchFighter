import * as mongoose from 'mongoose';
import * as assert from 'assert';
import * as Stream from '../stream/stream.model'
const supertest = require('supertest');
const app = require('../../testserver');
const request = supertest(app);

const options: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoCreate: true
  };

  const mongoDbUrl = process.env.CUSTOMCONNSTR_mongoDbConnStr || 'mongodb://localhost:27017/twitchFighter';
  async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany({});
    }
  }

beforeAll(async () => {
    const url = `mongodb://127.0.0.1/tf_test_streams`;
    await mongoose.connect(url, options);
})
afterEach(async () => {
    await removeAllCollections();
})
describe('Routing and Integration Tests', () => {
    it('Should save stream to database', async done => {
        const response = await request.post('/stream').send({
            twitchUserName: 'blah',
            streamUrl: 'blah blah.com',
            streamId: '1234'
        });
        expect(response.status).toBe(200);
        expect(response.body.twitchUserName).toBeTruthy();

        const stream = await Stream.default.findOne({streamId: '1234'});
        expect(stream.streamId).toBeTruthy();
        done();
    });
    it('Should get stream from database', async done =>{
        const response = await request.get('/stream')

        expect(response.status).toBe(200);
    })
});
