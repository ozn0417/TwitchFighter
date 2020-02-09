import express from 'express';
import { ControllerRouter } from './controller_router';
import Bets, { Bets as BetsInterface } from '../models/bets.model';

export class BetsController implements ControllerRouter {
    public router = express.Router();
    public route = '/bets';

    /** constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/:userId/:matchId', this.getUserMatchBets);
        this.router.get('/:userId', this.getAllUserBets);
        this.router.post('/', this.createBet);
        this.router.patch('/:id', this.updateBetsResult);
        this.router.delete('/:id', this.deleteBet)
    }
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
    /**async getUserMatchBets(req: express.Request, res: express.Response, next: express.NextFunction) {
        const userId: string = req.params.userId;
        const matchId: string = req.params.matchId;
        try {
            const match = await User.find();
            res.json(users);
        }
        catch (error) {
            const e = JSON.stringify(error);
            console.error(`Failed to get users ${e}`);
        }
    }*/

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
    /**async getAllUserBets(req: express.Request, res: express.Response, next: express.NextFunction) {
        const userId = req.params.userId;
        try {
            const bets = await Bets.find({

            });
        }
        catch (error) {
            const e = JSON.stringify(error);
            console.error(`Failed to get users ${e}`);
        }
    }*/

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
    /**async createBet(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user: UserInterface = req.body;
        try {
            const result: UserInterface[] = await User.create([user]);
            res.json(result);
        }
        catch (error) {
            const e = JSON.stringify(error);
            console.error(`Failed to create user ${e}`);
        }
    }*/

    /**
     * @swagger
     *
     * /user/{id}:
     *   patch:
     *     description: Update an existing User
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
    /**async updateBetsResult(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id: string = req.params.id;
        const newInfo: UserInterface = req.body;
        try {
            const oldUser = await User.findById(id);

            // remember to use $set!!
            await oldUser.updateOne({$set: newInfo});

            // findByIdAndUpdate will give you the old record
            const newUser = await User.findById(id);
            res.json(newUser);
        }
        catch (error) {
            const e = JSON.stringify(error);
            next(console.error(`Failed to update user ${e}`));
        }
    }*/

    /**
     * @swagger
     *
     * /user/{id}:
     *   delete:
     *     description: Delete user bt id
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
    /**async deleteBet(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id: string = req.params.id;
        try {
            await User.findByIdAndDelete(id);
            res.status(204).send();
        }
        catch (error) {
            const e = JSON.stringify(error);
            next(console.error(`Failed to update user ${e}`));
        }
    }*/
}
