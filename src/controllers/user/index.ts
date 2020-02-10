'use strict';
import * as express from "express";
import {getUsers,updateUser,createUser,deleteUser} from "../user/user_controller"
let router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.patch('/:id', deleteUser);

module.exports = router;