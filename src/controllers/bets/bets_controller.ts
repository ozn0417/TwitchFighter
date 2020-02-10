import * as express from 'express';
import Bets, { Bets as BetsInterface } from './bets.model';

    /**
     * @swagger
     *
     * /bets/{userId}/{matchId}:
     *   get:
     *     description: Get all user Bets on a match
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: userId
     *         description: User ID
     *         required: true
     *         schema:
     *           type: string
     *       - in: path
     *         name: matchId
     *         description: Match ID
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         response:
     *           type: array
     *           items:
     *              $ref: '#/definitions/Bets'
     */
    export async function getUserMatchBets(req: express.Request, res: express.Response, next: express.NextFunction) {
        const userId: string = req.params.userId;
        const matchId: string = req.params.matchId;
        try {
            const match = await Bets.find(
                {
                    userId,
                    matchId,
                }
            );
            res.json(match);
        }
        catch (error) {
            const e = JSON.stringify(error);
            console.error(`Failed to get users ${e}`);
        }
    }

    /**
     * @swagger
     *
     * /bets/{userId}:
     *   get:
     *     description: Get history of user Bets inclusive of active bets
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: userId
     *         description: User ID
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         response:
     *           type: array
     *           items:
     *              $ref: '#/definitions/Bets'
     */
    export async function getAllUserBets(req: express.Request, res: express.Response, next: express.NextFunction) {
        const userId = req.params.userId;
        try {
            const bets = await Bets.find({

            });
        }
        catch (error) {
            const e = JSON.stringify(error);
            console.error(`Failed to get users ${e}`);
        }
    }

    /**
     * @swagger
     *
     * /bets:
     *   get:
     *     description: Get all bests in DB
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         response:
     *           type: array
     *           items:
     *              $ref: '#/definitions/Bets'
     */
    export async function getAllBets(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const bets = await Bets.find();
            res.json(bets);
        }
        catch (error) {
            const e = JSON.stringify(error);
            console.error(`Failed to get users ${e}`);
        }
    }

    /**
     * @swagger
     *
     * /bets:
     *   post:
     *     description: Create a new bet
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: bets
     *         description: bets object
     *         in: body
     *         required: true
     *         type: string
     *         schema:
     *             $ref: '#/definitions/Bets'
     *     responses:
     *       200:
     *         response:
     *           schema:
     *             $ref: '#/definitions/Bets'
     */
    export async function createBet(req: express.Request, res: express.Response, next: express.NextFunction) {
        const bet: BetsInterface = req.body;
        console.log(bet);
        try {
            const result: BetsInterface[] = await Bets.create([bet]);
            res.json(result);
        }
        catch (error) {
            const e = JSON.stringify(error);
            console.error(`Failed to create user ${e}`);
        }
    }

    /**
     * @swagger
     *
     * /bets/{id}:
     *   patch:
     *     description: Update an existing Bet result
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: user
     *         description: User object
     *         required: true
     *         schema:
     *           $ref: '#/definitions/User'
     *       - in: path
     *         name: id
     *         description: User ID
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         response:
     *           schema:
     *             $ref: '#/definitions/User'
     */
    export async function updateBetsResult(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id: string = req.params.id;
        const newInfo: BetsInterface = req.body;
        try {
            const oldBet = await Bets.findById(id);
            await oldBet.updateOne({$set: newInfo});

            const newBet = await Bets.findById(id);
            res.json(newBet);
        }
        catch (error) {
            const e = JSON.stringify(error);
            next(console.error(`Failed to update user ${e}`));
        }
    }

    /**
     * @swagger
     *
     * /bets/{id}:
     *   delete:
     *     description: Delete user bet id
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         description: User ID
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         response:
     *           type: array
     *           items:
     *              $ref: '#/definitions/User'
     */
    export async function deleteBet(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id: string = req.params.id;
        try {
            await Bets.findByIdAndDelete(id);
            res.status(204).send();
        }
        catch (error) {
            const e = JSON.stringify(error);
            next(console.error(`Failed to update user ${e}`));
        }
    }
