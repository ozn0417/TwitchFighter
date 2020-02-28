// import * as sinon from "sinon";
// import * as StreamController from './stream_controller';

// let req = {
//   body: {
//       twitchUsername: 'blah',
//       streamUrl: 'blahblah.com'
//   },
//   params: {
//       id: "5aa06bb80738152cfd536fdc",
//   }
// };
// let error = new Error('{ error: "blah blah" }');
// let res = { json: "",
//             status: ""
//         };
// let expectedResult;

// beforeEach(function () {
//   res = {
//           json: sinon.spy(),
//           status: sinon.stub().returns({ end: sinon.spy() })
//       };
//   });

// describe('Stream Controller', function () {
//         it('should return created vehicle obj', t=> {
//           expectedResult = req.body
//           sinon.stub(StreamController.getStream).returns(expectedResult);
//           StreamController.StreamController.getStream();
//           sinon.assert.calledWith(Controller.getStream, req.body);
//           sinon.assert.calledWith(res.json, sinon.match({ model: req.body.twitchUsername}));
//           sinon.assert.calledWith(res.json, sinon.match({ manufacturer: req.body.streamUrl }));
//         });
// });