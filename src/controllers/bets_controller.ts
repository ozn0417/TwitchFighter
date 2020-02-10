import * as express from 'express';
import { ControllerRouter } from './controller_router';
import Bets, { Bets as BetsInterface } from '../models/bets.model';

export class BetsController implements ControllerRouter {
    public router = express.Router();
    public route = '/bets';

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/stream/:streamId', this.getStreamBets);
        this.router.get('/:userId', this.getAllUserBets);
        this.router.get('/', this.getAllBets);
        this.router.post('/', this.createBet);
        this.router.patch('/:id', this.updateBetsResult);
        this.router.delete('/:id', this.deleteBet);
    }
    /**
     * @swagger
     *
     * /bets/{userId}/{streamId}:
     *   get:
     *     description: Get all user Bets on a stream
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
     *         name: streamId
     *         description: Stream ID
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
    async getStreamBets(req: express.Request, res: express.Response, next: express.NextFunction) {
        const streamId: string = req.params.streamId;
        try {
            const query = Bets.find();
            query.where('streamId').equals(streamId);
            const streams = await query.exec();
            res.json(streams);
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
    async getAllUserBets(req: express.Request, res: express.Response, next: express.NextFunction) {
        const userId = req.params.userId;
        console.log(userId);
        try {
            const query = Bets.find();
            query.where('userId').equals(userId);
            const bets = await query.exec();
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
    async getAllBets(req: express.Request, res: express.Response, next: express.NextFunction) {
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
    async createBet(req: express.Request, res: express.Response, next: express.NextFunction) {
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
     *         description: Bets object
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Bets'
     *       - in: path
     *         name: id
     *         description: Bets ID
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         response:
     *           schema:
     *             $ref: '#/definitions/Bets'
     */
    async updateBetsResult(req: express.Request, res: express.Response, next: express.NextFunction) {
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
     *     description: Delete bet by id
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         description: Bet ID
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
    async deleteBet(req: express.Request, res: express.Response, next: express.NextFunction) {
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
}
