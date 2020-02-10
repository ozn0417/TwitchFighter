import * as sinon from "sinon";
import {getStreams, createStream, updateStream} from './stream_controller';
import * as Stream from './stream.model';

let Controller = {getStreams,createStream,updateStream};
let Model = {Stream};

let req = {
  body: {
      twitchUsername: 'blah',
      streamUrl: 'blahblah.com'
  },
  params: {
    id: '1234'
  }
};
let patchRes = {
  body: {
    twitchUsername: 'super serious twitch user',
    streamUrl: 'www.twitch.com'
  },
  params:{
    id: '1234'
  }
}

let error = new Error('{ error: "blah blah" }');
let res = {json:'' , status:'' };
let expectedResult;

describe('Stream Controller', () => {
  describe('POST Stream Object', () =>{
    it('should return created stream object', async () => {
      expectedResult = req.body;
      const stub = sinon.stub(Controller, 'createStream');
      stub.resolves(expectedResult);
      const result = await Controller.createStream(req,res);  
      sinon.assert.match(result,expectedResult);
      stub.restore();
    });
    it('should return 500 error when trying to create stream object', async () => {
      const stub = sinon.stub(Controller, 'createStream');
      stub.resolves(error);
      const result = await Controller.createStream(req,res);
      sinon.assert.match(result,error);
    });
  });
  describe('GET Stream Object', () => {
    it('should get dummy stream object', async () =>{
      expectedResult = req.body;
      const stub = sinon.stub(Controller, 'getStreams');
      stub.resolves(expectedResult);
      const result = await Controller.getStreams(req,res);
      sinon.assert.match(result,expectedResult);
      stub.restore();
    });
    it('should return 500 error when trying to get invalid stream object', async() => {
      const stub = sinon.stub(Controller, 'getStreams');
      stub.resolves(error);
      const result = await Controller.getStreams(req,res);
      sinon.assert.match(result,error);
    });
  });
  describe('PATCH Stream Object', () => {
    let status,
    json,
    res;
    beforeEach(function () {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
  });
    it('should patch dummy object', async () =>{
      expectedResult = patchRes;
      const stub = sinon.stub(Controller, 'updateStream');
      stub.resolves(expectedResult);
      const result = await Controller.updateStream(req,res);
      sinon.assert.match(result,expectedResult);
      stub.restore();
    });
    it('should return 500 error when trying change invalid stream object', async() => {
      const stub = sinon.stub(Controller, 'updateStream');
      stub.resolves(error);
      const result = await Controller.updateStream(req,res);
      sinon.assert.match(result,error);
    });
  });
});