'use strict';
import express from "express";
const Controller = require('./stream.controller');

let router = express.Router();

router.get('/', Controller.getStream);
router.post('/', Controller.createStream);

module.exports = router;