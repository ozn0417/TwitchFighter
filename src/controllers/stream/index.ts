'use strict';
import * as express from "express";
import {getStreams,createStream,updateStream} from "../stream/stream_controller"
let router = express.Router();

router.get('/', getStreams);
router.post('/', createStream);
router.patch('/:id', updateStream)

module.exports = router;