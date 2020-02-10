import * as sinon from "sinon";
import {getStreams, createStream, updateStream} from './stream_controller';
import { create } from 'domain';
let Controller = {getStreams,createStream,updateStream};
let req = {
  body: {
      twitchUsername: 'blah',
      streamUrl: 'blahblah.com'
  },
  params: {
      id: "5aa06bb80738152cfd536fdc",
  }
};
let error = new Error('{ error: "blah blah" }');
let res = {json:'' , status:'' };
let expectedResult;

beforeEach(function () {
  res = {
      json: sinon.spy(),
      status: sinon.stub().returns({ end: sinon.spy() }) // to spy res.status(500).end()
  };
});

describe('Stream Controller', function () {
        it('should return created stream obj', t=> {
          expectedResult = req.body;
          const postStub = sinon.stub(Controller, 'createStream');
          postStub.yields(null, expectedResult);
          Controller.createStream(req,res);
          sinon.assert.calledWith(Controller.createStream, req.body);
          sinon.assert.calledWith(res.json, sinon.match({ model: req.body.twitchUsername }));
          sinon.assert.calledWith(res.json, sinon.match({ manufacturer: req.body.streamUrl }));
        });
});