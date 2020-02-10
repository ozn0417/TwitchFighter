'use strict';
import * as express from "express";
import {getUserMatchBets,getAllUserBets,getAllBets,createBet,updateBetsResult,deleteBet} from "../bets/bets_controller";
let router = express.Router();

router.get('/:userId/:matchId', getUserMatchBets);
router.get('/:userId', getAllUserBets);
router.get('/', getAllBets);
router.post('/', createBet);
router.patch('/:id', updateBetsResult);
router.delete('/:id', deleteBet)

module.exports = router;